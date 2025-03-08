import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React, { useState } from "react";

import App from "./App";

const rootElement = document.getElementById("top");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
