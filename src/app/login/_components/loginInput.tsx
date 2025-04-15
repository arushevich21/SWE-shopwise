import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: (email: string, password: string) => void;
  errorText: string;
}

export default function LoginUI({
  email,
  password,
  setEmail,
  setPassword,
  login,
  errorText,
}: LoginProps) {
  const handleClick = () => login(email, password);

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
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-md text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleClick}
        >
          Login
        </button>
        <p className="text-sm text-center text-red-500 mt-1">{errorText}</p>
      </div>
    </div>
  );
}
