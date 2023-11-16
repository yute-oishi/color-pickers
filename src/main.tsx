import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "transparent",
          backgroundColor: "transparent",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div style={{ fontFamily: "Noto Sans JP" }}>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </div>
);
