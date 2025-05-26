import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useUserDeleteMutation } from "@/redux/endpoints/userApi";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function DeleteUser({ userId }: { userId: string }) {
  const [userDelete, { isLoading }] = useUserDeleteMutation();

  const onConfirm = async () => {
    try {
      await userDelete(userId).unwrap();
      toast.success("User deleted successfully");
      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Optionally, you can show an error message
    }
  };

  return (
    <section>
      <div className="p-4 space-y-4 text-center">
        <div className="flex justify-center text-red-600">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-lg font-semibold text-red-600">Confirm Deletion</h2>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this user? This action cannot be undone.
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
