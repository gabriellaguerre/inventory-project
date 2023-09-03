import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as RequestItemsActions from '../../store/request_items'
import * as ItemsActions from '../../store/items'
import * as RequestsActions from '../../store/requests'
import { useModal } from "../../context/Modal";
import './ItemList.css'



function ItemList({requestId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
     dispatch(ItemsActions.getAllItems())
     dispatch(RequestItemsActions.getRequestItems(requestId))
    },[dispatch, requestId])


    const requestItems = useSelector(state => (Object.values(state.request_items)).filter(requestitem => requestitem.requestId === requestId));
    const request = useSelector(state=>state.requests[requestId])
    const item = useSelector(state=> state.items)


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
            <div>Request ID: {request.id}
            <span className='created'>Created: {request.createdAt}</span></div>
            <table className='requestTable'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
            {requestItems.map(requestitem =>
                <tr key={requestitem.id} className='reqborder'>
                <td className='name'>{item[requestitem.itemId]?.code}</td>
                <td className='address'>{item[requestitem.itemId]?.description}</td>
                <td className='quantity'>{requestitem.quantity}</td>
                </tr>)}

            </table>
            {request?.voided ? (
                <div className='voided'>VOIDED on {request.updatedAt}</div>
            ) : (
                <button className='void' onClick={()=>handleVoid(request.id)}>Void</button>
            )}

            </div>
            </>

            )
}

export default ItemList;
