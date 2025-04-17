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
  const [successText, setSuccessText] = useState("");

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorText("Login Failed: " + error.message);
      setSuccessText("");
    } else {
      setErrorText("");
      setSuccessText("Login Successful!");
    }
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setErrorText("Failed to send reset email: " + error.message);
      setSuccessText("");
    } else {
      setErrorText("");
      setSuccessText("Password reset email sent! Check your inbox.");
    }
  }

  useEffect(() => {
    if (successText === "Login Successful!") {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [successText, router]);

  return (
    <LoginUI
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      login={login}
      resetPassword={resetPassword}
      errorText={errorText}
      successText={successText}
    />
  );
}
