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
    .then(<Redirect to='/items' />)
  }

  const Employee = async (e) => {
    e.preventDefault();
    await dispatch(login("marnie", "password"))
    .then(<Redirect to='/items' />)
  }


  return (
    <>
    <div className='formBody'>
      <div className='title'>Employee Log In</div>
      <form onSubmit={handleSubmit}>
        <div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
        </ul>
        </div>
        <div className='employeeID-DIV'>
          Employee ID:
          <input
            type="text"
            value={employeeID}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='passwordDiv'>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='submit'><button id='submit' type="submit">Log In</button></div>
        <div className='admin'><button id='admin' onClick={Admin}>Demo Admin</button></div>
        <div className='employee'><button id='employee'onClick={Employee}>Demo Employee</button></div>
      </form>
    </div>
    </>
  );
}

export default LoginFormPage;
