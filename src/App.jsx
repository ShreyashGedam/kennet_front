import { Route, Routes } from "react-router-dom";
import { Auth } from "./components/auth/Auth";
import { Home } from "./components/home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
