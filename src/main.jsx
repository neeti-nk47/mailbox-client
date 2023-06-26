import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./store/auth-context.jsx";
import { MailsContextProvider } from "./store/mails-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthContextProvider>
        <MailsContextProvider>
          <App />
        </MailsContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);
