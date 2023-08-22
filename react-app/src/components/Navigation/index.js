import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (

		<ul>
			{sessionUser && (
			  <div>
				<NavLink exact to="/">Home</NavLink>
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
