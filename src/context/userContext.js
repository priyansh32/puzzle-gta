import { useSession } from "next-auth/react";
import { createContext, useEffect } from "react";
import { useState } from "react";
export const UserContext = createContext({ user: null });

const UserContextProvider = ({ children }) => {
  const [User, setUser] = useState();
  const { data: session, status } = useSession();

  // can fetch all user data here from firestore and set it to user

  useEffect(() => {
    console.log("session", session);
    if (session) setUser(session.user);
  }, [session]);

  return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
