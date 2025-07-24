import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "../Components/Menu";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");

  const showMenu = () => setMenu(!menu);

  const handlesearch = async (keyword) => {
    try {
      const trimmed = keyword.trim();
      if (!trimmed) return;
      await axios.get(`${URL}/api/searchtask`, {
        params: { keyword: trimmed },
      });
      navigate(`/?task=${trimmed}`);
      setPrompt("");
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-4 bg-black text-white">
      <h1 className="text-lg sm:text-xl font-extrabold">
        <Link to="/">To Do List</Link>
      </h1>

      {path === "/" && (
        <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto">
          <button onClick={() => handlesearch(prompt)} className="text-white">
            <FaSearch />
          </button>
          <input
            type="text"
            value={prompt}
            onChange={(e) => {
              const value = e.target.value;
              setPrompt(value);
              if (value.trim() === "") navigate("/");
            }}
            placeholder="Search a task"
            className="flex-1 sm:w-64 px-3 py-2 border rounded-3xl text-white bg-transparent border-white outline-none"
          />
        </div>
      )}

      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <p onClick={handleLogout} className="cursor-pointer">
              Logout
            </p>
            <div className="cursor-pointer" onClick={showMenu}>
              <FaBars />
              {menu && <Menu />}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      <div className="md:hidden flex items-center mt-2 sm:mt-0">
        <div onClick={showMenu} className="cursor-pointer">
          <FaBars />
        </div>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
