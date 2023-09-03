import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as POsActions from '../../store/purchase_orders';
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

const purchase_orders = useSelector(state => Object.values(state.purchase_orders))
const user = useSelector(state => state.user)


return (
    <>
        <table>
            <th>Status</th>
            <th>Purchase Order ID</th>
            <th>Date Created</th>
            <th>Created By</th>
            <th>View Purchase Order</th>
         {purchase_orders.map(pos =>
         <tr key={pos.id} className='requestBox'>
        {pos.voided ? (
            <td>voided</td>
        ): (
            <td>received</td>
        )}
        <td>{pos.id}</td>
        <td>{pos.createdAt}</td>
        <td>{user[pos.userId].employeeID}</td>
        <div>
         <OpenModalButton
              buttonText='View purchase order'
              modalComponent={<ItemListPO posId={pos.id}/>}/></div>
         </tr>)}
        </table>
    </>
)
}

export default POPage;
