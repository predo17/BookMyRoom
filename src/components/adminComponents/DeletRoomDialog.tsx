import { Button } from "@/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog"

type Props = {
    open: boolean
    title?: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
    onCancel: () => void
    onConfirm: () => void
}

export default function DeletRoomDialog({
    open,
    title = "Confirmar ação",
    message,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onCancel,
    onConfirm,
}: Props) {
    return (
        <Dialog.Root open={open} onOpenChange={onCancel}>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />

                {/* Content centralizado */}
                <Dialog.Content
                    className="
            fixed left-1/2 top-1/2 z-50
            w-full max-w-md
            -translate-x-1/2 -translate-y-1/2
            rounded-2xl bg-background p-6 shadow-lg
            focus:outline-none
          "
                >
                    <Dialog.Title className="text-lg font-semibold">
                        {title}
                    </Dialog.Title>

                    {message && (
                        <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                            {message}
                        </Dialog.Description>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <Dialog.Close asChild>
                            <Button variant="outline">{cancelLabel}</Button>
                        </Dialog.Close>

                        <Dialog.Close asChild>
                            <Button variant="destructive" onClick={onConfirm}>
                                {confirmLabel}
                            </Button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
