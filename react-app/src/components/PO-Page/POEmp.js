import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as POsActions from '../../store/purchase_orders';
import * as UsersActions from '../../store/user';
import ItemListPO from '../ItemsPage/ItemListPO';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import OpenModalButton from '../OpenModalButton';
import './POEmp.css';



function POEmp() {

const dispatch = useDispatch()

useEffect(()=> {
    dispatch(POsActions.getPOS())
    dispatch(UsersActions.get_Users())
}, [dispatch])

const purchase_orders = useSelector(state => Object.values(state.purchase_orders))
const user = useSelector(state => state.user)


return (
    <>
        <table className='po-table-employee'>
        <thead>
        <tr>
             <td className='header' style={{textAlign:'center'}} colSpan = '11'><button  id='requestForm'><OpenModalButton
             buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
             modalComponent={<NewRequestForm />}/></button>
          <button id='poForm'><OpenModalButton
                    buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                    modalComponent={<NewPOForm />}/></button>
                    <button className='POs'>
        <NavLink to='/items' id='items'><i className="fa-regular fa-eye"></i> Items</NavLink></button>
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
           <td><div id='received'>received</div></td>
           ):(
               <td><div id='open'>open</div></td>
        )}
        <td>{pos.id}</td>
        <td>{pos.createdAt}</td>
        <td>{user[pos.userId]?.employeeID}</td>
        <td>
         <OpenModalButton
              buttonText=<div><i className="fa-regular fa-eye"></i></div>
              modalComponent={<ItemListPO posId={pos.id}/>}/></td>
         </tr>)}
         </tbody>
        </table>
    </>
)
}

export default POEmp;
