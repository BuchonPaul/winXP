import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { AppContextProvider } from "./data/WindowsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Theme>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Theme>
);
