import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.js";
import { ThemeProvider } from "./context/Darkmode.tsx";
import { Toaster } from "react-hot-toast";
import { LoginProvider } from "./context/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LoginProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </BrowserRouter>
      </LoginProvider>
    </ThemeProvider>
  </StrictMode>
);
