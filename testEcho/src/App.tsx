import { Routes, Route } from "react-router-dom";
import Authorization from "./pages/authorizationPage/Authorization";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authorization />}></Route>
    </Routes>
  );
}

export default App;
