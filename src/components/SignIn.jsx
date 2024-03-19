import { useContext, useState } from "react";
import { UserContext } from "./Store";

function SignIn() {
  const userContext = useContext(UserContext);
  const { signInUser } = userContext;
  const [user, setUser] = useState({ email: "", password: "" });

  function onChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  }
  function onSignIn() {
    signInUser(user);
  }
  function isValid() {
    return Object.values(user).every((value) => value.trim() !== "");
  }
  return (
    <div>
      <h2>Sign In</h2>
      <p>
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onChange}
        />
      </p>
      <p>
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
        />
      </p>
      <button disabled={!isValid()} onClick={onSignIn}>
        Sign in
      </button>
    </div>
  );
}
export default SignIn;
