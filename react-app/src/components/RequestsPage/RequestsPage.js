import React from 'react';
import { Redirect } from 'react-router-dom';
import RequestsAdmin from './RequestsAdmin';
import RequestsEmp from './RequestsEmp';
import './RequestsPage.css';



function RequestsPage({user}) {

    if(!user) {
        return <Redirect to="/" />
    }

    return (
        <>
        <div className='homeTitle'>Request List</div>
        {(user.accessLevel === 'admin') ? (
            <RequestsAdmin />
        ) : (
            <RequestsEmp />
        )}
        </>
    )
}

export default RequestsPage;
