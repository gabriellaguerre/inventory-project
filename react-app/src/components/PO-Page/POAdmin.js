import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as POsActions from '../../store/purchase_orders';
import * as UsersActions from '../../store/user';
import ItemListPO from '../ItemsPage/ItemListPO';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm'
import './POAdmin.css';



function POAdmin() {

const dispatch = useDispatch()

useEffect(()=> {
    dispatch(POsActions.getPOS())
    dispatch(UsersActions.get_Users())
}, [dispatch])

const purchase_orders = useSelector(state => Object.values(state.purchase_orders))
const user = useSelector(state => state.user)


return (
    <>
        <table className='po-table-admin'>
        <thead>
        <tr>
          <td className='header' style={{textAlign:'center'}} colSpan = '11'><button  id='requestForm'><OpenModalButton
             buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
             modalComponent={<NewRequestForm />}/></button>
          <button id='poForm'><OpenModalButton
                    buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                    modalComponent={<NewPOForm />}/></button>
          <button id='itemForm'><OpenModalButton
                    buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Item</span>
                    modalComponent={<NewItemForm />}/></button>
         <button id='supplierForm'><OpenModalButton
                    buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Supplier</span>
                    modalComponent={<NewSupplierForm />}/></button>

        <button className='items'>
        <NavLink to='/items' id='POs'><i className="fa-regular fa-eye"></i> Items</NavLink></button>
       <button className='requests'>
        <NavLink to='/requests' id='requests'><i className="fa-regular fa-eye"></i> Requests</NavLink></button>
        <button className='suppliers'>
        <NavLink to='/suppliers' id='suppliers'><i className="fa-regular fa-eye"></i> Suppliers</NavLink></button>
        </td>
        </tr>
        <tr className='labels'>
            <th>Status</th>
            <th>Purchase Order ID</th>
            <th>Date Created</th>
            <th>Created By</th>
            <th>View Purchase Order</th>
        </tr>
        </thead>
        <tbody>
         {purchase_orders.map(pos =>
         <tr key={pos.id} className='requestBox'>
        {pos.received ? (
            <td>received</td>
        ): (
            <td>open</td>
        )}
        <td>{pos.id}</td>
        <td>{pos.createdAt}</td>
        <td>{user[pos.userId]?.employeeID}</td>
        <div>
         <OpenModalButton
              buttonText=<div><i className="fa-regular fa-eye"></i></div>
              modalComponent={<ItemListPO posId={pos.id}/>}/></div>
         </tr>)}
         </tbody>
        </table>
    </>
)
}

export default POAdmin;
