import QuestionnaireBuilder from '@/components/QuestionnaireBuilder';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BuilderPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="mb-4">
                <Link href="/questionnaires" className="flex items-center text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Questionnaires
                </Link>
            </div>
            
            <div className="flex items-center justify-between space-y-2 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Form Builder</h2>
                    <p className="text-muted-foreground mt-1">Drag and drop fields to design your dynamic questionnaire.</p>
                </div>
            </div>
            
            <QuestionnaireBuilder />
        </div>
    );
}
