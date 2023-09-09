import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import ivy3 from '../Navigation/ivy3-modified2.png'

function SignupFormModal() {
	const dispatch = useDispatch();
	const [employeeID, setEmployeeID] = useState("");
	const [accessLevel, setAccessLevel] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(employeeID, accessLevel, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};
	// className='modalContainer'
	return (
		<>
			<div className='signUpmodalContainer'>
			<div className='imageSignUp'>
     			 <img src={ivy3} alt="ivy-pic" width="130" height="100"></img>
     		 </div>
			<div className='signuptitle'><h3>Sign Up New Employee</h3></div>
			<form onSubmit={handleSubmit}>
				<div className='errors'>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				</div>
				<div className='employeeID'>
				<label>
					Employee ID:{" "}
					<input
						type="text"
						value={employeeID}
						onChange={(e) => setEmployeeID(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className='access'>Access Level:{' '}
				<select
						value={accessLevel}
						onChange={(e) => setAccessLevel(e.target.value)}
						required
						>
				  <option value='' disabled>Select Type</option>
                  <option value='admin'>Admin</option>
                  <option value='employee'>Employee</option>
				</select>
				</div>
				<div className='password'>
				<label>
					Password:{' '}
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className='confirm'>
				<label>
					Confirm Password:{' '}
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className='submit'>
				<button id='submit' type="submit">Sign Up</button>
				<button id='cancelsignup' onClick={()=>closeModal()}>Cancel</button>
				</div>
			</form>
			</div>
		</>
	);
}

export default SignupFormModal;
