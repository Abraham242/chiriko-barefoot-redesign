import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/dm-sans";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
