import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
