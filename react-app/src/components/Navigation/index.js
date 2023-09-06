import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import ivy3 from './ivy3-modified2.png'
import './Navigation.css';

function Navigation({ isLoaded }){

	const sessionUser = useSelector(state => state.session.user);

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
