import React from 'react';
import { Redirect } from 'react-router-dom';
import ItemsAdmin from './ItemsAdmin.js';
import ItemsEmp from './ItemsEmp.js';


function ItemsPage ({user}) {

    if(!user) {
        return <Redirect to="/" />
    }

    return (
        <>
        <h1>Inventory List</h1>
        {(user.accessLevel === 'admin') ? (
            <ItemsAdmin />
        ) : (
            <ItemsEmp />
        )}


        </>
    )
}

export default ItemsPage;
