import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as RequestsActions from '../../store/requests';
import * as UsersActions from '../../store/user';
import ItemList from '../ItemsPage/ItemList';
import OpenModalButton from '../OpenModalButton';
import './RequestsPage.css'



function RequestsPage() {
const dispatch = useDispatch()

useEffect(()=> {
    dispatch(RequestsActions.getRequests())
    dispatch(UsersActions.get_Users())
}, [dispatch])

const requests = useSelector(state => Object.values(state.requests))
const user = useSelector(state => state.user)


return (
    <>

         {requests.map(request =>
         <div key={request.id} className='requestBox'>
        <div>Request ID: {request.id}</div>
        <div>Created: {request.createdAt}</div>
        <div>Created By: {user[request.userId].employeeID}</div>
        <div>
         <OpenModalButton
              buttonText='View request'
              modalComponent={<ItemList requestId={request.id}/>}/></div>
         </div>)}

    </>
)
}

export default RequestsPage;
