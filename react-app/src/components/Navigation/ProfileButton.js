import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom'
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
            <li>Employee: {user.employeeID}</li>
            <li>Access: {user.accessLevel}</li>
            <li>
              <button className='logout' onClick={handleLogout}>Log Out</button>
            </li>
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
