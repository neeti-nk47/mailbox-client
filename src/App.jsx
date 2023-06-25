import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import SignupLogin from "./components/SignupLogin";
import Layout from "./components/Layout";
import Inbox from "./components/Inbox";
import Sentbox from "./components/Sentbox";
import Compose from "./components/Compose";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/mailbox" element={<Layout />}>
          <Route index element={<Inbox />} />
          <Route path="/mailbox/Sentmail" element={<Sentbox />} />
          <Route path="/mailbox/Compose" element={<Compose />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
