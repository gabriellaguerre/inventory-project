import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from 'react-router-dom'
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
    .then(<Redirect to="/" />)
    .then(setShowMenu(false))
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className='profileButton' onClick={openMenu}>
         {/* <i className="fa-solid fa-user" ></i> */}
        <i className="fas fa-user-circle" />
        {/* <i className="fa-solid fa-user-large"></i> */}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div><NavLink to='/purchase_orders' onClick={()=>setShowMenu(false)}>View Purchase Orders</NavLink></div>
            <div><NavLink to='/requests' onClick={()=>setShowMenu(false)}>View Requests</NavLink></div>
            <div><NavLink to='/items' onClick={()=>setShowMenu(false)}>View Items</NavLink></div>
            <div><NavLink to='/suppliers' onClick={()=>setShowMenu(false)}>View Suppliers</NavLink></div>
            <div>Employee: {user.employeeID}</div>
            <div>Access: {user.accessLevel}</div>
            <div>
              <button className='logout' onClick={handleLogout}>Log Out</button>
              {user.accessLevel === 'admin' && (
            <button className='signup'>
              <OpenModalButton
              buttonText="Add New Employee"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}/></button>
              )}

            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
