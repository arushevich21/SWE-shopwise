"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginUI from "./_components/loginInput";
import { supabase } from "../api/lib/util/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorText("Login Failed: " + error.message);
    } else {
      setErrorText("Login Successful!");
    }
  }

  useEffect(() => {
    if (errorText === "Login Successful!") {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [errorText, router]);

  return (
    <LoginUI
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      login={login}
      errorText={errorText}
    />
  );
}
