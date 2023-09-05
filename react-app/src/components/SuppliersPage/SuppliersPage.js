import React from 'react';
import { Redirect } from 'react-router-dom';
import SuppliersAdmin from './SuppliersAdmin';
import SuppliersEmp from './SuppliersEmp';
import NewRequestForm from '../NewRequestForm/NewRequestForm';
import NewPOForm from '../NewPOForm/NewPOForm.js';
// import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm.js';
import OpenModalButton from '../OpenModalButton';
import './SuppliersPage.css'

function SuppliersPage ({user}) {

        if(!user) {
            return <Redirect to="/" />
        }

        return (
            <>
            <div className='homeTitle'>Supplier List</div>
            {(user.accessLevel === 'admin') ? (
                <>
                <div className='headButtons'>
                    <span className='newReq'><OpenModalButton
                        buttonText='Create New Request'
                        modalComponent={<NewRequestForm />}/></span>
                   <span className='newPO'><OpenModalButton
                        buttonText='Create New PO'
                        modalComponent={<NewPOForm />}/></span>
                {/* <span className='newIForm'><OpenModalButton
                        buttonText='Create New Item'
                        modalComponent={<NewItemForm />}/></span> */}
                 <span className='newSForm'><OpenModalButton
                        buttonText='Create New Supplier'
                        modalComponent={<NewSupplierForm />}/></span> </div>
                <SuppliersAdmin />
                </>
            ) : (
                <>
                 <div className='headButtons'>
                    <span className='newReq'><OpenModalButton
                        buttonText='Create New Request'
                        modalComponent={<NewRequestForm />}/></span>
                   <span className='newPO'><OpenModalButton
                        buttonText='Create New PO'
                        modalComponent={<NewPOForm />}/></span></div>
                <SuppliersEmp />
                </>
            )}


            </>
        )
    }

    export default SuppliersPage;
