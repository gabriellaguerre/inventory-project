import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import * as POITEMsActions from '../../store/purchase_order_items'
import * as POsActions from '../../store/purchase_orders';
// import { useModal } from "../../context/Modal";
import OpenModalButton from '../OpenModalButton';
import EditItemListPO from '../EditItemListPO/EditItemListPO'
import './ItemListPO.css'



function ItemListPO({posId}) {
    // const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
        dispatch(POITEMsActions.getPOItems(posId))
    },[dispatch, posId])


    const poItems = useSelector(state => (Object.values(state.purchase_order_items)).filter(positem => positem.purchase_orderId === posId));
    const po = useSelector(state=>state.purchase_orders[posId])
    const item = useSelector(state=> state.items)
    const user = useSelector(state => state.user)


    const addPOItems = () => {
        dispatch(POsActions.editPO(posId))
        poItems.forEach(poItem => dispatch(ItemsActions.poeditItem(poItem.itemId, poItem.quantity)))
    }

    return (
            <>
            <div className='poTableContainer'>
            <div className='titlePOid'>Purchase Order ID: {po.id}</div>
            <div className='created'>Date Created: {po.createdAt}</div>
            <div className='createdBy'>Created By: {user[po.userId]?.employeeID}</div>
            <table className='poTable'>
                <thead>
                <tr className='labels'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
            {poItems.map(poitem =>
                <tr key={poitem.id} >
                <td className='name'>{item[poitem.itemId]?.code}</td>
                <td className='description'>{item[poitem.itemId]?.description}</td>
                <td>{poitem.quantity}</td>
                </tr>)}
                </tbody>
            </table>
            <div className='signBy'>Signed By: {user[po.userId]?.employeeID}</div>
            {poItems[0]?.image && (
              <img className='sigImg' alt='' src={poItems[0]?.image} />
            )}

            <div className='poButtons'>
            {po.received ? (
                <div className='received'>** Received on {po.updatedAt} **</div>
            ):(
                <button className='receive' onClick={()=>addPOItems() }>Receive Items</button>
            )}

            <span>
            {!po.received &&
              <button className='editPObutton'><OpenModalButton
              buttonText='Edit Purchase Order'
              modalComponent={<EditItemListPO posId={posId}/>}/> </button>}
            </span>
            </div>
            </div>
            </>

            )
}

export default ItemListPO;
