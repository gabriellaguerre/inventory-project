import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import { useModal } from "../../context/Modal";
import './ItemList.css'
// import './SuppliersList.css'


function ItemListPO({posId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(()=> {
     dispatch(ItemsActions.resetState())
     dispatch(ItemsActions.getPOItems(posId))
    },[dispatch, posId])


    const poItems = useSelector(state => (Object.values(state.items)));
    const po = useSelector(state=>state.pos[posId])

    return (
            <>
            <div className='reqTableContainer'>
            <div>PO ID: {po.id}
            <span className='created'>Created: {po.createdAt}</span></div>
            <table className='requestTable'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
            {poItems.map(item =>
                <tr key={item.id} className='border'>
                <td className='name'>{item.code}</td>
                <td className='address'>{item.description}</td>
                <td>{item.po_quantity}</td>
                </tr>)}
            </table>
            <button className='void' >Void</button>
            </div>
            </>

            )
}

export default ItemListPO;
