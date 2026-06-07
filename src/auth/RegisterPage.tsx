import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { useState } from "react";
import { register as registerUser } from "../api/authApi";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    try {
      await registerUser({
        username: username,
        password: password,
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
      setUsername("");
      setPassword("");
      return;
    }
  }

  return (
    <div id="register-page-container">
      <p>Please enter your desired username and password to register.</p>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button id="registerSubmitBtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
