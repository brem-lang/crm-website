import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ImageUpload({
    name,
    label,
    currentUrl,
    error,
    accept = 'image/*',
}: {
    name: string;
    label: string;
    currentUrl?: string | null;
    error?: string;
    accept?: string;
}) {
    const [preview, setPreview] = useState<string | null>(null);
    const displayUrl = preview ?? currentUrl;

    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>

            <div className="flex items-center gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                    {displayUrl ? (
                        <img src={displayUrl} alt="" className="size-full object-cover" />
                    ) : (
                        <ImageIcon className="size-6 text-muted-foreground" />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <Input
                        id={name}
                        name={name}
                        type="file"
                        accept={accept}
                        className="cursor-pointer file:cursor-pointer"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            setPreview(file ? URL.createObjectURL(file) : null);
                        }}
                    />
                    <InputError message={error} className="mt-1.5" />
                </div>
            </div>
        </div>
    );
}
