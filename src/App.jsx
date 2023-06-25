import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import SignupLogin from "./components/SignupLogin";
import Layout from "./components/Layout";
import Inbox from "./components/Inbox";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Layout />}>
          <Route index element={<Inbox />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
