/**
 * PopupContext
 *
 * Global popup state management using React Context.
 * The popup state is a ReactNode or null - no separate isOpen boolean.
 */

import { createContext, ReactNode, useState, useCallback, useMemo } from "react";

interface PopupContextValue {
  popup: ReactNode | null;
  openPopup: (content: ReactNode) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextValue | undefined>(undefined);

interface PopupProviderProps {
  children: ReactNode;
}

export function PopupProvider({ children }: PopupProviderProps) {
  const [popup, setPopup] = useState<ReactNode | null>(null);

  const openPopup = useCallback((content: ReactNode) => {
    setPopup(content);
  }, []);

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  const value = useMemo(
    () => ({ popup, openPopup, closePopup }),
    [popup, openPopup, closePopup]
  );

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
}
