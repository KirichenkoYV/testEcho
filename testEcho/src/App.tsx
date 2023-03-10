import { Routes, Route } from "react-router-dom";
import Authorization from "./pages/authorizationPage/Authorization";
import CabinetUser from "./pages/cabinetUserPage/CabinetUser";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authorization />}></Route>
      <Route path="/user" element={<CabinetUser />}></Route>
    </Routes>
  );
}

export default App;
