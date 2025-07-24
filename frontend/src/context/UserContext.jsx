import { useEffect, useState } from "react";
import { createContext } from "react";
export const UserContext = createContext({});
import axios from "axios";
import { URL } from "../url";
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      const user = res.data;
      const normalizedUser = {
        ...user,
        _id: user._id || user.id,
      }; // always ensures _id exists
      setUser(normalizedUser);
    } catch (e) {
      console.log(e.message);
      setUser(null);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
