import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as POsActions from '../../store/pos';
import * as UsersActions from '../../store/user';
import ItemListPO from '../ItemsPage/ItemListPO';
import OpenModalButton from '../OpenModalButton';
import '../RequestsPage/RequestsPage.css';



function POPage() {

const dispatch = useDispatch()

useEffect(()=> {
    dispatch(POsActions.getPOS())
    dispatch(UsersActions.get_Users())
}, [dispatch])

const purchase_orders = useSelector(state => Object.values(state.pos))
const user = useSelector(state => state.user)


return (
    <>

         {purchase_orders.map(pos =>
         <div key={pos.id} className='requestBox'>
        <div>Purchase Order ID: {pos.id}</div>
        <div>Created: {pos.createdAt}</div>
        <div>Created By: {user[pos.userId].employeeID}</div>
        <div>
         <OpenModalButton
              buttonText='View purchase order'
              modalComponent={<ItemListPO posId={pos.id}/>}/></div>
         </div>)}

    </>
)
}

export default POPage;
