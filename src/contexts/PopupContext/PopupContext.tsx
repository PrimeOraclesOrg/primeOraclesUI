/**
 * PopupContext
 *
 * Global popup state management using React Context.
 * The popup state is a ReactNode or null - no separate isOpen boolean.
 */

import { createContext, ReactNode } from "react";

interface PopupContextValue {
  popup: ReactNode | null;
  openPopup: (content: ReactNode) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextValue | undefined>(undefined);
