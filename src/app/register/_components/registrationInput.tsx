
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerIntoDatabase } from '../../api/userRegistration/route.ts'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

interface registrationData {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  register: (username: string, password: string) => void;
}

export default function register({username, password, setUsername, setPassword, register, errorText}: registrationData) {

  const handleClick = () => {
    register(username, password);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-4 p-4 bg-black items-center shadow-lg rounded-lg">
          <FontAwesomeIcon className="mr-4" size="lg" icon={faPiggyBank} />
          Start Saving Today
        </div>
        <input type="text" placeholder="Username" className="p-3 border rounded-md text-black" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Password" className="p-3 border rounded-md text-black" onChange={(e) => setPassword(e.target.value)}/>
        <button className="p-2 bg-green-500 text-white rounded-md hover:bg-blue-600 " onClick={handleClick}>
          Register
        </button>
      </div>
      <p className="mt-4 text-green-500">{errorText}</p>
    </div>
  );
}