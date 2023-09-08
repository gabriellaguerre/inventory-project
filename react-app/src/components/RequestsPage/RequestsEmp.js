import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as RequestsActions from '../../store/requests';
import * as UsersActions from '../../store/user';
import ItemList from '../ItemsPage/ItemList';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import OpenModalButton from '../OpenModalButton';
import './RequestsEmp.css'



function RequestsEmp() {
const dispatch = useDispatch()

useEffect(()=> {
    dispatch(RequestsActions.getRequests())
    dispatch(UsersActions.get_Users())
}, [dispatch])

const requests = useSelector(state => Object.values(state.requests))
const user = useSelector(state => state.user)


return (
    <>
        <table className='request-table-employee'>
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
       <button className='POs'>
        <NavLink to='/pruchase_orders' id='POs'><i className="fa-regular fa-eye"></i> POs</NavLink></button>
        <button className='suppliers'>
        <NavLink to='/suppliers' id='suppliers'><i className="fa-regular fa-eye"></i> Suppliers</NavLink></button>
        </td>
        </tr>
        <tr className='labels'>
            <th>Status</th>
            <th>Request ID</th>
            <th>Date Created</th>
            <th>Created By</th>
            <th>View Request</th>
        </tr>
        </thead>
        <tbody>
         {requests.map(request =>
         <tr key={request.id} className='requestBox'>
        {request.voided ? (
            <td>voided</td>
        ):(
            <td>applied</td>
        )}
        <td>{request.id}</td>
        <td>{request.createdAt}</td>
        <td>{user[request.userId]?.employeeID}</td>
        <td>
         <OpenModalButton
              buttonText=<div><i className="fa-regular fa-eye"></i></div>
              modalComponent={<ItemList requestId={request.id}/>}/></td>
         </tr>)}
         </tbody>
     </table>
    </>
)
}

export default RequestsEmp;