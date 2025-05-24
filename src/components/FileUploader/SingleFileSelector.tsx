import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { CloudUpload, X } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export type SingleFileSelectorProps = {
    allowedFormats?: string[];
    onFileSelected: (file: File | null) => void;
    initialPreviewUrl?: string | null;
    disabled?: boolean;
    maxSize?: number;
    className?: string;
};

export default function SingleFileSelector({
    allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'],
    onFileSelected,
    initialPreviewUrl = null,
    disabled = false,
    maxSize = 5 * 1024 * 1024, // Default 5MB
    className = '',
}: SingleFileSelectorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            onFileSelected(null);
            return;
        }

        const file = files[0];
        setError(null);

        // Validate file type
        if (!allowedFormats.includes(file.type)) {
            setError(`Invalid file type. Allowed formats: ${allowedFormats.join(', ')}`);
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            setError(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
            return;
        }

        // Create preview for images
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result as string);
            setIsLoading(false);
            onFileSelected(file);
        };
        reader.onerror = () => {
            setIsLoading(false);
            setError('Failed to read file');
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        setError(null);
        onFileSelected(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex gap-4 items-start flex-wrap">
                {!previewUrl && !isLoading && (
                    <div className="w-full">
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="w-full py-10 px-4 rounded-md border-2 border-dashed border-gray-300 hover:border-primary flex flex-col items-center justify-center transition-colors"
                            disabled={disabled}
                        >
                            <CloudUpload className="text-[#6B6B6B] mb-2" size={24} />
                            <span className="text-sm text-gray-500 text-center">
                                Select file or{' '}
                                <span className="text-primary font-medium">Browse</span>
                            </span>
                            <span className="text-xs text-muted-foreground mt-1">
                                Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                            </span>
                        </button>
                        <Input
                            type="file"
                            accept={allowedFormats.join(',')}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={disabled}
                        />
                    </div>
                )}

                {(previewUrl || isLoading) && (
                    <div className="relative group w-[130px] h-[130px]">
                        {isLoading ? (
                            <Skeleton className="w-full h-full rounded-md" />
                        ) : (
                            <>
                                <img
                                    src={previewUrl as string}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-md"
                                />
                                {!disabled && (
                                    <button
                                        type="button"
                                        onClick={handleRemove}
                                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Remove file"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {error && <p className="text-sm font-medium text-destructive mt-1">{error}</p>}
        </div>
    );
}
