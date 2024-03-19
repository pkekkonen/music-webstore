import { useContext, useState } from "react";
import { UserContext } from "./Store";

function SignUp() {
  const userContext = useContext(UserContext);
  const { createUser } = userContext;
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  function onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  }
  function isValid() {
    return Object.values(user).every((value) => value.trim() !== "");
  }

  function onSubmit() {
    createUser(user);
  }
  return (
    <>
      <div>
        <h2>Create new account</h2>
        <hr />
        <p>
          <span>Full Name</span>
          <input name="name" value={user.name} onChange={onChange}></input>
        </p>
        <p>
          <span>Email</span>
          <input name="email" value={user.email} onChange={onChange}></input>
        </p>
        <p>
          <span>Password</span>
          <input
            name="password"
            value={user.password}
            onChange={onChange}
          ></input>
        </p>

        <button onClick={onSubmit} disabled={!isValid()} >Sign up</button>
      </div>
    </>
  );
}
export default SignUp;
