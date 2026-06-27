import WorkflowEditor from '@/components/WorkflowEditor';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WorkflowEditorPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="mb-4">
                <Link href="/workflows" className="flex items-center text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Workflows
                </Link>
            </div>
            
            <div className="flex items-center justify-between space-y-2 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Edit Workflow</h2>
                    <p className="text-muted-foreground mt-1">Design your verification process by connecting nodes.</p>
                </div>
            </div>
            
            <WorkflowEditor workflowId={params.id} />
        </div>
    );
}
