import { useState, useEffect, useRef } from 'react';
import * as ort from 'onnxruntime-web';

// Initialize ONNX WebGL/WASM backend
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

export function useLiveness() {
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [livenessScore, setLivenessScore] = useState<number>(0);
    const [isSpoof, setIsSpoof] = useState<boolean>(false);
    
    const sessionRef = useRef<ort.InferenceSession | null>(null);
    const loopRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                // IMPORTANT: You must download a MiniFASNet ONNX model and place it in public/models/fas.onnx
                // For example: https://github.com/minivision-ai/Silent-Face-Anti-Spoofing
                
                // Check if file exists first to avoid ONNX runtime console errors
                const res = await fetch('/models/fas.onnx', { method: 'HEAD' });
                if (!res.ok) {
                    console.warn('⚠️ ONNX model not found at /models/fas.onnx. Liveness detection will be simulated or disabled.');
                    return;
                }

                const session = await ort.InferenceSession.create('/models/fas.onnx', { executionProviders: ['webgl', 'wasm'] });
                sessionRef.current = session;
                setIsModelLoaded(true);
                console.log('✅ ONNX Liveness model loaded');
            } catch (error) {
                console.error('❌ Failed to load ONNX Liveness model:', error);
                // Depending on the environment, we might fallback to passive
            }
        };

        loadModel();

        return () => {
            if (loopRef.current) cancelAnimationFrame(loopRef.current);
            sessionRef.current = null;
        };
    }, []);

    const processFrame = async () => {
        if (!sessionRef.current || !videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        if (video.readyState !== 4) {
            loopRef.current = requestAnimationFrame(processFrame);
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // This is a simplified tensor creation. 
        // A real implementation requires face detection cropping, resizing to model input (e.g. 80x80), 
        // and normalizing pixels according to the specific ONNX model training parameters.
        try {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const inputTensor = new ort.Tensor('float32', new Float32Array(imageData.data), [1, 3, canvas.width, canvas.height]);
            
            // Run inference
            const feeds: Record<string, ort.Tensor> = {};
            feeds[sessionRef.current.inputNames[0]] = inputTensor;
            
            const results = await sessionRef.current.run(feeds);
            const output = results[sessionRef.current.outputNames[0]];
            
            // Assuming output is [probability_fake, probability_real]
            const logits = output.data as Float32Array;
            const fakeProb = logits[0];
            const realProb = logits[1];
            
            setLivenessScore(Math.round(realProb * 100));
            setIsSpoof(realProb < 0.90);
        } catch (e) {
            // Ignore tensor errors on missing models
        }

        // Loop
        loopRef.current = requestAnimationFrame(processFrame);
    };

    const startDetection = (videoElement: HTMLVideoElement) => {
        videoRef.current = videoElement;
        // Create an offscreen canvas for frame processing
        const canvas = document.createElement('canvas');
        canvas.width = 80; // Example dimensions for MiniFASNet
        canvas.height = 80;
        canvasRef.current = canvas;
        
        if (loopRef.current) cancelAnimationFrame(loopRef.current);
        processFrame();
    };

    const stopDetection = () => {
        if (loopRef.current) cancelAnimationFrame(loopRef.current);
        videoRef.current = null;
    };

    return { isModelLoaded, livenessScore, isSpoof, startDetection, stopDetection };
}
