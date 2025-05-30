import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

export default function DialogWrapper({
    trigger,
    content,
}: {
    trigger: React.ReactNode;
    content: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="!w-[900px]">{content}</DialogContent>
        </Dialog>
    );
}
