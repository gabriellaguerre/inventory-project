import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as RequestsActions from '../../store/requests';
import * as UsersActions from '../../store/user';
import ItemList from '../ItemsPage/ItemList';
import OpenModalButton from '../OpenModalButton';
import './RequestsPage.css'



function RequestsAdmin() {
const dispatch = useDispatch()

useEffect(()=> {
    dispatch(RequestsActions.getRequests())
    dispatch(UsersActions.get_Users())
}, [dispatch])

const requests = useSelector(state => Object.values(state.requests))
const user = useSelector(state => state.user)


return (
    <>
        <table>
            <th>Status</th>
            <th>Request ID</th>
            <th>Date Created</th>
            <th>Created By</th>
            <th>View Request</th>
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
              buttonText='View request'
              modalComponent={<ItemList requestId={request.id}/>}/></td>
         </tr>)}
     </table>
    </>
)
}

export default RequestsAdmin;
