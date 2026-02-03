/**
 * PopupRenderer
 *
 * Global popup renderer using shadcn/ui Dialog.
 * Visibility is determined by the presence of popup content (not a boolean).
 */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePopup } from "@/hooks/usePopup";

export function PopupRenderer() {
  const { popup, closePopup } = usePopup();

  return (
    <Dialog open={popup !== null} onOpenChange={(open) => !open && closePopup()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[calc(100vw-2rem)] p-4 sm:max-w-md sm:p-6 max-h-[85vh] overflow-y-auto">
        {popup}
      </DialogContent>
    </Dialog>
  );
}
