// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import CustomApp from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<CustomApp />);
