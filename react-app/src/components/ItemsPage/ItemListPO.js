import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import * as POITEMsActions from '../../store/purchase_order_items'
import * as POsActions from '../../store/purchase_orders';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../OpenModalButton';
import EditItemListPO from '../EditItemListPO/EditItemListPO'
import './ItemList.css'
// import './SuppliersList.css'


function ItemListPO({posId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
        dispatch(POITEMsActions.getPOItems(posId))
    },[dispatch, posId])


    const poItems = useSelector(state => (Object.values(state.purchase_order_items)).filter(positem => positem.purchase_orderId === posId));
    const po = useSelector(state=>state.purchase_orders[posId])
    const item = useSelector(state=> state.items)
    console.log(po, 'PO ITEMS LIST')

    const addPOItems = () => {
        dispatch(POsActions.editPO(posId))
        poItems.forEach(poItem => dispatch(ItemsActions.poeditItem(poItem.itemId, poItem.quantity)))
    }

    return (
            <>
            <div className='reqTableContainer'>
            <div>Purchase Order ID: {po.id}
            <span className='created'>Created: {po.createdAt}</span></div>
            <table className='requestTable'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
            {poItems.map(poitem =>
                <tr key={poitem.id} className='border'>
                <td className='name'>{item[poitem.itemId]?.code}</td>
                <td className='description'>{item[poitem.itemId]?.description}</td>
                <td>{poitem.quantity}</td>
                </tr>)}
            </table>
            <div>
            {po.received ? (
                <div className='received'>Received on {po.updatedAt}</div>
            ):(
                <button className='receive' onClick={()=>addPOItems() }>Receive</button>
            )}
            </div>
            <div>
            {!po.received &&
                <OpenModalButton
              buttonText='Edit Purchase Order'
              modalComponent={<EditItemListPO posId={posId}/>}/> }
            </div>
            </div>
            </>

            )
}

export default ItemListPO;
