import DialogWrapper from '@/components/DialogContents';
import FileUploader, { type CloudinaryUploadResponse } from '@/components/FileUploader';
import Headers from '@/components/Headers';
import SearchInput from '@/components/SearchInput';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddTeams from './AddTeams';

export default function Teams() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [files, setFiles] = useState<CloudinaryUploadResponse[]>([]);

    const handleUploadSuccess = (uploaded: CloudinaryUploadResponse[]) => {
        setFiles(uploaded);
    };

    const handleDeleteSuccess = (publicId: string) => {
        setFiles(prev => prev.filter(file => file.public_id !== publicId));
    };

    return (
        <>
            <Headers title="Project">
                <div className="flex items-center gap-2">
                    <SearchInput value={searchTerm} onChange={setSearchTerm} />
                    <DialogWrapper
                        trigger={
                            <Button>
                                <Plus /> Add Project
                            </Button>
                        }
                        content={<AddTeams />}
                    />
                </div>
            </Headers>

            <div>
                <FileUploader
                    folder="my_uploads"
                    allowedFormats={['image/*', 'application/pdf']}
                    fileData={files}
                    onUploadSuccess={handleUploadSuccess}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            </div>
        </>
    );
}
