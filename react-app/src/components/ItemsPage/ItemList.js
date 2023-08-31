import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import { useModal } from "../../context/Modal";
import './ItemList.css'



function ItemList({requestId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
     dispatch(ItemsActions.resetState())
     dispatch(ItemsActions.getRequestItems(requestId))
    },[dispatch, requestId])


    const requestedItems = useSelector(state => (Object.values(state.items)));
    const request = useSelector(state=>state.requests[requestId])


    let arr = [];

    if (requestedItems[0]) {
    let convertObj = {...requestedItems[0]}
    convertObj['reqQuantity'] = request.quantity1
    arr.push(convertObj)
    }

    if (requestedItems[1]) {
    let convertObj2 = {...requestedItems[1]}
    convertObj2['reqQuantity'] = request.quantity2
    arr.push(convertObj2)
    }

    if (requestedItems[2]) {
    let convertObj3 = {...requestedItems[2]}
    convertObj3['reqQuantity'] = request.quantity3
    arr.push(convertObj3)
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
            {arr.map(item =>
                <tr key={item.id} className='reqborder'>
                <td className='name'>{item.code}</td>
                <td className='address'>{item.description}</td>
                <td className='quantity'>{item.reqQuantity}</td>
                </tr>)}

            </table>
            <button className='void' >Void</button>
            </div>
            </>

            )
}

export default ItemList;
