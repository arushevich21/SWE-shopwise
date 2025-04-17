"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../api/lib/util/supabaseClient";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  useEffect(() => {
    // Check if we have a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      }
    });
  }, [router]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorText("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorText("Password must be at least 6 characters");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setErrorText("Failed to reset password: " + error.message);
    } else {
      setSuccessText("Password reset successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg w-[300px]">
        <div className="flex flex-col gap-2 items-center bg-black text-white p-3 rounded-lg">
          <p className="font-semibold">Reset Your Password</p>
        </div>
        <input
          type="password"
          placeholder="New Password"
          className="p-3 border rounded-md text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="p-3 border rounded-md text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="p-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        <p className="text-sm text-center text-red-500 mt-1">{errorText}</p>
        <p className="text-sm text-center text-green-500 mt-1">{successText}</p>
      </div>
    </div>
  );
} 