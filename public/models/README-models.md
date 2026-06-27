# Liveness ONNX Model

To make the liveness detection work, you must place your MiniFASNet ONNX model here and name it `fas.onnx`.

**Where to get it:**
You can train your own or download open-source models like MiniFASNet (Silent Face Anti Spoofing).
Ensure the input tensor shape matches what the `useLiveness.ts` hook expects (e.g., `[1, 3, 80, 80]`).
