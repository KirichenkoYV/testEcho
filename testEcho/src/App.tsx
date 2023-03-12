import { Routes, Route } from "react-router-dom";
import Authorization from "./pages/authorizationPage/Authorization";
import CabinetUser from "./pages/cabinetUserPage/CabinetUser";
import PasswordRecoveryPage from "./pages/passwordRecoveryPage/passwordRecoveryPage";
import RegisterPage from "./pages/registerPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authorization />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/user" element={<CabinetUser />}></Route>
      <Route path="/restorePassword" element={<PasswordRecoveryPage />}></Route>
    </Routes>
  );
}

export default App;
