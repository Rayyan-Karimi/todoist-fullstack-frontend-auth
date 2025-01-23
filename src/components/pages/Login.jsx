import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  loginUserViaApi,
  registerUserViaApi,
  getProjectsViaApi,
  getTasksViaApi,
} from "../../service/apiService";

const Login = ({ setUserData }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(true); // Toggle between login/signup
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (login) {
        const loginResponse = await loginUserViaApi({ email, password });

        if (loginResponse?.user) {
          setUserData(loginResponse.user);
          // Fetch projects and tasks after successful login
          try {
            await Promise.all([getProjectsViaApi(), getTasksViaApi()]);
            navigate("/dashboard");
          } catch (err) {
            console.error("Error fetching initial data:", err);
            setError("Error loading your data. Please try again.");
          }
        }
      } else {
        const signupResponse = await registerUserViaApi({
          name,
          email,
          password,
        });

        if (signupResponse?.user) {
          setUserData(signupResponse.user);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Error in Login/Signup:", err);
      setError(
        err.response?.data?.error ||
          "Authentication failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-500">
      <div className="flex flex-col items-center bg-emerald-300 p-10 rounded-3xl">
        <h3 className="text-xl font-bold underline">
          {login ? `Login` : `Signup`}
        </h3>
        <button
          className="border text-black border-black m-2 bg-yellow-300 rounded-lg px-2"
          onClick={() => setLogin(!login)}
        >
          {login ? `New user? Sign Up` : `Already signed up? Log In!`}
        </button>
        <form
          className="flex flex-col gap-4 p-10 bg-amber-200 m-4"
          onSubmit={handleSubmit}
        >
          {!login && (
            <label htmlFor="name" className="flex justify-between min-w-10">
              <span>Name:</span>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required={!login}
              />
            </label>
          )}
          <label htmlFor="email" className="flex justify-between min-w-10">
            <span>Email:</span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label htmlFor="password" className="flex justify-between">
            <span>Password:</span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="text-red-600">{error}</p>}
          <button
            className="border border-black m-2 bg-green-600 active:bg-lime-200 text-gray-50 font-bold rounded-sm p-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : login ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  setUserData: PropTypes.func.isRequired,
};

export default Login;
