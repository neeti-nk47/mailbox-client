import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import SignupLogin from "./components/SignupLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
