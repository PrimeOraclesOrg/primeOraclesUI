import { ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PreviousLocationContext } from "./PreviousLocationContext";

interface PreviousLocationProviderProps {
  children?: ReactNode;
}

export const PreviousLocationProvider = ({ children }: PreviousLocationProviderProps) => {
  const location = useLocation();

  const prevLocationRef = useRef<string | null>(null);

  const previous = prevLocationRef.current;

  prevLocationRef.current = location.pathname;

  return (
    <PreviousLocationContext.Provider value={previous}>{children}</PreviousLocationContext.Provider>
  );
};
