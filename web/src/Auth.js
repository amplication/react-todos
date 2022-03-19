import { useState } from "react";
import { login, signup } from "./lib/auth";

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value.toLowerCase());
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmChange = (e) => setConfirm(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const func = isLogin ? login : signup;
    if (!isLogin) {
      if (password !== confirm) {
        return alert("Passwords do not match");
      }
    }
    const result = await func(username, password);
    setUser(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {!isLogin && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            value={confirm}
            onChange={handleConfirmChange}
            required
          />
        )}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account?" : "Already have an account?"}
        </button>
      </form>
    </div>
  );
}
