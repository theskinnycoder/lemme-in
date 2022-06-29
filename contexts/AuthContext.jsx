import { createContext, useEffect, useState } from "react";
import supabaseClient from "../lib/supabase";
import { formatUser } from "../utils/functions";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabaseClient.auth.session());

    const { data } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      data.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: formatUser(session?.user) ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
