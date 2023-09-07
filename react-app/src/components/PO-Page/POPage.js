import React from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import POAdmin from './POAdmin';
import POEmp from './POEmp';
import './POPage.css';



function POPage({user}) {
    
    if(!user) {
        return <Redirect to="/" />
    }

    return (
        <>
        <div className='homeTitle'>Purchase Order List</div>
        {(user.accessLevel === 'admin') ? (
            <POAdmin />
        ) : (
            <POEmp />
        )}
        </>
    )
}

export default POPage;
