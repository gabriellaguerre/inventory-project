import React from 'react';
import { Redirect } from 'react-router-dom';
import ItemsAdmin from './ItemsAdmin.js';
import ItemsEmp from './ItemsEmp.js';
// import OpenModalButton from '../OpenModalButton';
// import NewItemForm from '../NewItemForm/NewItemForm.js'
// import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
// import NewPOForm from '../NewPOForm/NewPOForm.js';
import './ItemsPage.css'


function ItemsPage ({user}) {

    if(!user) {
        return <Redirect to="/" />
    }

    return (
        <>
        <div className='homeTitle'>Item List</div>
        {(user.accessLevel === 'admin') ? (
            // <>
            // <div className='headButtons'>
            //      <span className='newReq'>  <OpenModalButton
            //         buttonText=<div><i className="fa-regular fa-plus"></i> New Request</div>
            //         modalComponent={<NewRequestForm />}/></span>
            //    <span className='newPO'><OpenModalButton
            //         buttonText=<div><i className="fa-regular fa-plus"></i> New PO</div>
            //         modalComponent={<NewPOForm />}/></span>
            // <span className='newIForm'><OpenModalButton
            //         buttonText=<div><i className="fa-regular fa-plus"></i> New Item</div>
            //         modalComponent={<NewItemForm />}/></span>

            //  </div>
            <ItemsAdmin user={user}/>
          //  </>
        ) : (
            // <>
            //  <div className='headButtons'>
            //     <span className='newReq'><OpenModalButton
            //         buttonText='Create New Request'
            //         modalComponent={<NewRequestForm />}/></span>
            //    <span className='newPO'><OpenModalButton
            //         buttonText='Create New PO'
            //         modalComponent={<NewPOForm />}/></span>
            // </div>
            <ItemsEmp user={user}/>
          //  </>
        )}


        </>
    )
}

export default ItemsPage;
