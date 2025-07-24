import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "../Components/Menu";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  //console.log(user);
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  const [prompt, setPrompt] = useState("");
  const path = useLocation().pathname;
  //console.log(prompt);

  const handlesearch = async (keyword) => {
    try {
      const trimmed = keyword.trim();

      if (!trimmed) return;
      const { data } = await axios.get(`${URL}/api/searchtask`, {
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
      window.location.reload(); // optional: force refresh
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:[200px] py-4 bg-black text-white">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">To Do List</Link>
        </h1>
        {path === "/" && (
          <div className="ml-4 flex items-center justify-center space-x-0 cursor-pointer gap-4">
            <p onClick={() => handlesearch(prompt)} className="cursor-pointer">
              {" "}
              <FaSearch />
            </p>
            <input
              onChange={(e) => {
                const value = e.target.value;
                setPrompt(value);
                if (value.trim() === "") navigate("/");
              }}
              type="text"
              placeholder="search a task"
              className="px-3 py-3 outline-none text-white border-2 rounded-3xl"
            ></input>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <p className="cursor-pointer text-white" onClick={handleLogout}>
              Logout
            </p>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div className="md:hidden " onClick={showMenu}>
          <p>
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
