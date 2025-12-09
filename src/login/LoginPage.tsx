import { useState } from "react";
import "./LoginPage.css";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username || !password) {
      console.log(`${username}, ${password}`);
      return;
    }

    const response = await login({ username, password });
    if (!response) {
      alert("Login failed. Please try again.");
      setUsername("");
      setPassword("");
      return;
    }
    for (const [key, value] of Object.entries(response)) {
      localStorage.setItem(key, value);
    }
    nav("/export");
  }

  return (
    <div id="login-page-container">
      <p>Please enter your credentials to log in.</p>
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
        <button id="loginSubmitBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
