import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import * as POITEMsActions from '../../store/purchase_order_items'
import * as POsActions from '../../store/purchase_orders';


function PrintList() {

    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
        dispatch(POITEMsActions.getAllPOItems())
        dispatch(POsActions.getAllPOS())
    },[dispatch])


    const poItems = useSelector(state => (Object.values(state.purchase_order_items)));
    const po = useSelector(state=>state.purchase_orders)
    const item = useSelector(state=> state.items)
    const user = useSelector(state => state.user)


    return (
            <>

            <div className='poTableContainer'>
            <div className='titlePOid'>Purchase Order ID: {po.id}</div>
            <div id='closePO'><button className='closePO' onClick={()=>closeModal()}> X </button></div>
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
            {po?.image && (
              <img className='sigImg' alt='' src={po?.image} />
            )}

            <div className='poButtons'>
            {po.received ? (
                <div className='received'>** Received on {po.updatedAt} **</div>
            ):(
                <div className='receive' >Not Yet Received</div>
            )}

            {/* <span>
            {!po.received &&
              <button className='editPObutton'><OpenModalButton
              buttonText='Edit Purchase Order'
              modalComponent={<EditItemListPO posId={posId}/>}/> </button>}
            </span> */}
            </div>
            </div>
            </>

            )
}

export default PrintList;
