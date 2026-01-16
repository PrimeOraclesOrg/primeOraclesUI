import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setToastDispatch } from "./hooks/useToast.ts";
import { store } from "./store/store.ts";
import "./lib/i18n";

setToastDispatch(store.dispatch);
createRoot(document.getElementById("root")!).render(<App />);
