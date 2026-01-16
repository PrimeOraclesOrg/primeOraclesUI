import { ReactNode, useCallback, useMemo, useState } from "react";
import { PopupContext } from "./PopupContext";

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

  const value = useMemo(() => ({ popup, openPopup, closePopup }), [popup, openPopup, closePopup]);

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
}
