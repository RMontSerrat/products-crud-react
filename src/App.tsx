import { Products } from "@/features/Products";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@emotion/react";

import { theme } from "@/styles/theme";
import { RecoilRoot } from "recoil";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <ModalProvider>
            <Products />
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
