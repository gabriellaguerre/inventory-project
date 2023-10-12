import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as RequestItemsActions from '../../store/request_items'
import * as ItemsActions from '../../store/items'
import * as RequestsActions from '../../store/requests'
import { useModal } from "../../context/Modal";
import './ItemListReq.css'



function ItemListReq({requestId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
     dispatch(ItemsActions.getAllItems())
     dispatch(RequestItemsActions.getRequestItems(requestId))
    },[dispatch, requestId])


    const requestItems = useSelector(state => (Object.values(state.request_items)).filter(requestitem => requestitem.requestId === requestId));
    const request = useSelector(state=>state.requests[requestId])
    const item = useSelector(state=> state.items)
    const user = useSelector(state => state.user)


    const handleVoid = (requestId) => {
        dispatch(RequestsActions.editRequest(requestId))
        .then(dispatch(RequestsActions.getRequests()))
        requestItems.forEach(requestItem =>
            dispatch(ItemsActions.reqitemEdit(requestItem.itemId, requestItem.quantity)))

        closeModal()
        }


    return (
            <>
            <div className='reqTableContainer'>
            <div className='titleReqid'>Request ID: {request.id}</div>
            <div id='closeREQ'><button className='closeREQ' onClick={()=>closeModal()}> X </button></div>
            <div className='createdReq'>Date Created: {request.createdAt}</div>
            <div className='createdBy'>Created By: {user[request.userId]?.employeeID}</div>
            <table className='requestTable'>
            <thead>
                <tr className='labels'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
            {requestItems.map(requestitem =>
                <tr key={requestitem.id} className='reqborder'>
                <td className='name'>{item[requestitem.itemId]?.code}</td>
                <td className='address'>{item[requestitem.itemId]?.description}</td>
                <td className='quantity'>{requestitem.quantity}</td>
                </tr>)}
                </tbody>
            </table>
            <div className='signBy'>Signed By: {user[request.userId]?.employeeID}</div>
            {request?.image && (
              <img className='sigImg' alt='' src={request?.image} />
            )}
            {request?.voided ? (
                <div className='voided'>VOIDED on {request.updatedAt}</div>
            ) : (
               <div className='voidButton'><button className='void' onClick={()=>handleVoid(request.id)}>Void</button></div>
            )}

            </div>
            </>

            )
}

export default ItemListReq;
