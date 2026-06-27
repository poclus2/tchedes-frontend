import CustomizationEditor from '@/components/CustomizationEditor';

export default function CustomizationPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between space-y-2 mb-2">
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Branding & Customization</h2>
            </div>
            <p className="text-slate-500 mb-8">
                Customize how the Hosted Verification flow appears to your users. Changes are reflected instantly.
            </p>
            <CustomizationEditor />
        </div>
    );
}
