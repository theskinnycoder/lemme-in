import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import supabaseClient from "../lib/supabase";

export default function useAuth() {
  const { user } = useContext(AuthContext);

  async function signInWithSlack() {
    await supabaseClient.auth.signIn({
      provider: "slack",
    });
  }

  async function signout() {
    await supabaseClient.auth.signOut();
  }

  return {
    user,
    signInWithSlack,
    signout,
  };
}
