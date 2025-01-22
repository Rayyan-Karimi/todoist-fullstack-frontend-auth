import { useState } from "react";
import "../../App.css";
import {
  getProjectsViaApi,
  getTasksViaApi,
  loginUserViaApi,
} from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  // console.log("yahan se pehle 2");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(true);

  const handleSubmit = async () => {
    // event.preventDefault();
    console.log("yahan nahi > handleSubmit > Login.jsx");
    setName(name);
    setEmail(email);
    setPassword(password);
    if (login) {
      console.log("name updated", name);
      await loginUserViaApi({ name, email, password });
      setIsAuthenticated(true);
      console.log("Going to dash....");
      await getProjectsViaApi();
      await getTasksViaApi();
      await navigate("/dashboard");
    } else {
      console.log("email updated", email);
    }
  };

  console.log('Itna bohot hai')
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-500">
      <div className="flex flex-col items-center bg-emerald-300 p-10 rounded-3xl">
        <h3 className="text-xl font-bold underline">
          {login ? `Login` : `Signup`}
        </h3>
        <div>
          <button
            className="border text-black border-black m-2 bg-yellow-300 rounded-lg px-2"
            onClick={() => setLogin(!login)}
          >
            {login ? `New user ? Sign Up` : `Already signed up ? Log in!`}
          </button>
        </div>
        <div className="flex flex-col gap-4 p-10 bg-amber-200 m-4">
          <label htmlFor="name" className="flex justify-between min-w-10">
            <span>Name:</span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="rayyan name"
            />
          </label>
          <label htmlFor="email" className="flex justify-between min-w-10">
            <span>Email:</span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="rayyan email"
            />
          </label>
          <label htmlFor="password" className="flex justify-between">
            <span>Password:</span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button
          className="border border-black m-2 bg-green-600 active:bg-lime-200 text-gray-50 font-bold rounded-sm p-2"
          type="submit"
          onClick={handleSubmit}
        >
          {login ? `Login` : `Signup`}
        </button>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
