/**
 * PopupRenderer
 *
 * Global popup renderer using shadcn/ui Dialog.
 * Visibility is determined by the presence of popup content (not a boolean).
 */

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { usePopup } from "@/hooks/usePopup";

export function PopupRenderer() {
  const { popup, closePopup } = usePopup();

  return (
    <Dialog open={popup !== null} onOpenChange={(open) => !open && closePopup()}>
      <DialogContent className="sm:max-w-md">
        {popup}
      </DialogContent>
    </Dialog>
  );
}
