import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface LoginProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: (email: string, password: string) => void;
  resetPassword: (email: string) => void;
  errorText: string;
  successText: string;
}

export default function LoginUI({
  email,
  password,
  setEmail,
  setPassword,
  login,
  resetPassword,
  errorText,
  successText,
}: LoginProps) {
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = () => login(email, password);
  const handleResetPassword = () => resetPassword(email);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg w-[300px]">
        <div className="flex flex-col gap-2 items-center bg-black text-white p-3 rounded-lg">
          <FontAwesomeIcon className="text-white" size="lg" icon={faPiggyBank} />
          <p className="font-semibold">Welcome Back</p>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-md text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!showResetPassword && (
          <>
            <input
              type="password"
              placeholder="Password"
              className="p-3 border rounded-md text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="p-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => setShowResetPassword(true)}
            >
              Forgot Password?
            </button>
          </>
        )}
        {showResetPassword && (
          <>
            <button
              className="p-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleResetPassword}
            >
              Send Reset Link
            </button>
            <button
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => setShowResetPassword(false)}
            >
              Back to Login
            </button>
          </>
        )}
        <p className="text-sm text-center text-red-500 mt-1">{errorText}</p>
        <p className="text-sm text-center text-green-500 mt-1">{successText}</p>
      </div>
    </div>
  );
}
