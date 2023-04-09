import { createContext, useEffect } from "react";
import { useState } from "react";
export const UserContext = createContext({ user: null });

const UserContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  // can fetch all user data here from firestore and set it to user
  // get user data from firestore

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        console.log("user", data);
        setUser(data);
      });
  }, []);

  return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
