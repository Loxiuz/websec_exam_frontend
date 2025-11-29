import { useState } from "react";
import { loginInfo } from "../constants/loginInfo";
import "./LoginPage.css";

export default function LoginPage({
  onLogin,
}: {
  onLogin: (employeeId: string) => void;
}) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!employeeId || !password) {
      alert("Please enter both username and password.");
      return;
    }
    for (const login of loginInfo) {
      if (login.employeeId === employeeId && login.password === password) {
        onLogin(employeeId);
        return;
      }
    }
    alert("Invalid username or password. Please try again.");
    setEmployeeId("");
    setPassword("");
    return;
  }

  return (
    <div id="login-page-container">
      <p>Please enter your credentials to log in.</p>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            onChange={(e) => {
              e.preventDefault();
              setEmployeeId(e.target.value);
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
