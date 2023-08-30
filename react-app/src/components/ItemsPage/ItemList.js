import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import { useModal } from "../../context/Modal";
import './ItemList.css'
// import './SuppliersList.css'


function ItemList({requestId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
     dispatch(ItemsActions.resetState())
     dispatch(ItemsActions.getRequestItems(requestId))
    },[dispatch, requestId])


    const requestedItems = useSelector(state => (Object.values(state.items)));
    const request = useSelector(state=>state.requests[requestId])

    return (
            <>
            <div className='reqTableContainer'>
            <div>Request ID: {request.id}
            <span className='created'>Created: {request.createdAt}</span></div>
            <table className='requestTable'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
            {requestedItems.map(item =>
                <tr key={item.id} className='border'>
                <td className='name'>{item.code}</td>
                <td className='address'>{item.description}</td>
                <td>{item.req_quantity}</td>
                </tr>)}
            </table>
            <button className='void' >Void</button>
            </div>
            </>

            )
}

export default ItemList;
