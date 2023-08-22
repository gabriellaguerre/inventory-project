import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [employeeID, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(employeeID, password));
    if (data) {
      setErrors(data);
    }
  };

  const Admin = async (e) => {
    e.preventDefault();
    await dispatch(login("Demo", "password"))
  }

  const Employee = async (e) => {
    e.preventDefault();
    await dispatch(login("marnie", "password"))
  }


  return (
    <>
      <h1>Employee Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeID}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={Admin}>Demo Admin</button>
        <button onClick={Employee}>Demo Employee</button>
      </form>
    </>
  );
}

export default LoginFormPage;
