import { createContext, useEffect } from "react";
import { useState } from "react";
export const UserContext = createContext({ user: null });

const UserContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
