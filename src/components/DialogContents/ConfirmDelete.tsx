import { AlertTriangle } from "lucide-react";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";

export default function ConfirmDelete({ onConfirm, isLoading }: { onConfirm: () => void, isLoading: boolean }) {
  return (
    <section>
      <div className="p-4 space-y-4 text-center">
        <div className="flex justify-center text-red-600">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-lg font-semibold text-red-600">Confirm Deletion</h2>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </section>
  );
};
