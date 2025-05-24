import { useState } from 'react';

export function useDialog(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);
    const toggleDialog = () => setIsOpen(prev => !prev);

    return {
        isOpen,
        openDialog,
        closeDialog,
        toggleDialog,
        // For Radix Dialog compatibility
        dialogProps: {
            open: isOpen,
            onOpenChange: setIsOpen,
        },
    };
}
