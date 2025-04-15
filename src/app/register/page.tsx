"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RegistrationUI from "./_components/registrationInput";
import { supabase } from "../api/lib/util/supabaseClient";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  async function register(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorText(error.message || "Registration failed.");
    } else {
      setErrorText("Registration successful!");
    }
  }

  useEffect(() => {
    if (errorText === "Registration successful!") {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [errorText, router]);

  return (
    <RegistrationUI
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      register={register}
      errorText={errorText}
    />
  );
}
