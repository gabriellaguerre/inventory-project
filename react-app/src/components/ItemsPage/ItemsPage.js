import React from 'react';
import { Redirect } from 'react-router-dom';
import ItemsAdmin from './ItemsAdmin.js';
import ItemsEmp from './ItemsEmp.js';
import OpenModalButton from '../OpenModalButton';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm.js';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';


function ItemsPage ({user}) {

    if(!user) {
        return <Redirect to="/" />
    }

    return (
        <>
        <div className='homeTitle'>Inventory List</div>
        {(user.accessLevel === 'admin') ? (
            <>
            <div className='newRequest'><OpenModalButton
                    buttonText='Create New Request'
                    modalComponent={<NewRequestForm />}/>
               <span className='newPO'><OpenModalButton
                    buttonText='Create New PO'
                    modalComponent={<NewPOForm />}/></span>
            <span className='newIForm'><OpenModalButton
                    buttonText='Create New Item'
                    modalComponent={<NewItemForm />}/></span>
             <span className='newSForm'><OpenModalButton
                    buttonText='Create New Supplier'
                    modalComponent={<NewSupplierForm />}/></span> </div>
            <ItemsAdmin />
            </>
        ) : (
            <>
             <div><OpenModalButton
                    buttonText='Create New Request'
                    modalComponent={<NewRequestForm />}/>
               <span><OpenModalButton
                    buttonText='Create New PO'
                    modalComponent={<NewPOForm />}/></span></div>
            <ItemsEmp />
            </>
        )}


        </>
    )
}

export default ItemsPage;
