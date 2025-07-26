import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // make sure App is correctly imported

const root = createRoot(document.getElementById("root"));
root.render(<App />);
