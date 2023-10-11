import React, { useEffect }from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as SessionActions from '../../store/session'
import ivy3 from './ivy3-modified2.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()

	const sessionUser = useSelector(state => state.session.user);

	let inactivityTimer;

	function resetInactivityTimer() {
		clearTimeout(inactivityTimer);
		inactivityTimer = setTimeout(logoutUser, 20 * 60 * 1000); // 20 minutes
	}

	function logoutUser() {
		dispatch(SessionActions.logout())
	}

	useEffect(() => {
		window.addEventListener('mousemove', resetInactivityTimer);
		window.addEventListener('keypress', resetInactivityTimer);
		resetInactivityTimer();

		return () => {
			window.removeEventListener('mousemove', resetInactivityTimer);
			window.removeEventListener('keypress', resetInactivityTimer);
		};
	}, []);

	return (

		<ul className='navigation'>
			{sessionUser && (
				<div>
					<img src={ivy3} alt="ivy-pic" width="130" height="100"></img>
					{/* <NavLink to='/items'>IVY - Inventory Management System</NavLink> */}
				</div>
			)}

			{isLoaded && sessionUser && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</ul>
	)
}

export default Navigation;
