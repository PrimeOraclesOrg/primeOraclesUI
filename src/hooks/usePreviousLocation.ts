import { PreviousLocationContext } from "@/contexts";
import { useContext } from "react";

export const usePreviousLocation = () => useContext(PreviousLocationContext);
