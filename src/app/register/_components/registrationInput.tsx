import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

interface RegistrationProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  register: (email: string, password: string) => void;
  errorText: string;
}

export default function RegistrationUI({
  email,
  password,
  setEmail,
  setPassword,
  register,
  errorText,
}: RegistrationProps) {
  const handleClick = () => register(email, password);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-3 p-4 bg-white shadow-lg rounded-lg w-[300px]">
        <div className="flex flex-col gap-2 items-center bg-black text-white p-3 rounded-lg">
          <Link href="/">
            <FontAwesomeIcon className="text-white" size="lg" icon={faPiggyBank} />
          </Link>
          <p className="font-semibold">Start Saving Today</p>
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
          Register
        </button>
        <button
        className="text-sm text-blue-500 hover:text-blue-700"
        >
          <a href="/login"> Have an account? </a>
        </button>
        <p className="text-sm text-center text-red-500 mt-1">{errorText}</p>
      </div>
    </div>
  );
}
