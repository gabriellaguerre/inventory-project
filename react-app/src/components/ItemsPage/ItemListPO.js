import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import * as POsActions from '../../store/purchase_order_items'
import { useModal } from "../../context/Modal";
import './ItemList.css'
// import './SuppliersList.css'


function ItemListPO({posId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
        dispatch(POsActions.getPOItems(posId))
    },[dispatch, posId])


    const poItems = useSelector(state => (Object.values(state.purchase_order_items)).filter(positem => positem.purchase_orderId === posId));
    const po = useSelector(state=>state.purchase_orders[posId])
    const item = useSelector(state=> state.items)


    return (
            <>
            <div className='reqTableContainer'>
            <div>PO ID: {po.id}
            <span className='created'>Created: {po.createdAt}</span></div>
            <table className='requestTable'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
            {poItems.map(poitem =>
                <tr key={poitem.id} className='border'>
                <td className='name'>{item[poitem.itemId].code}</td>
                <td className='address'>{item[poitem.itemId].description}</td>
                <td>{poitem.quantity}</td>
                </tr>)}
            </table>
            <button className='void' >Receive</button>
            </div>
            </>

            )
}

export default ItemListPO;
