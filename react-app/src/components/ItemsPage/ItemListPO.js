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
   

    let arr = [];

    if (poItems[0]) {
    let convertObj = {...poItems[0]}
    convertObj['poQuantity'] = po.quantity1
    arr.push(convertObj)
    }

    if (poItems[1]) {
    let convertObj2 = {...poItems[1]}
    convertObj2['poQuantity'] = po.quantity2
    arr.push(convertObj2)
    }

    if (poItems[2]) {
    let convertObj3 = {...poItems[2]}
    convertObj3['poQuantity'] = po.quantity3
    arr.push(convertObj3)
    }
    return (
            <>
            <div className='reqTableContainer'>
            <div>PO ID: {po.id}
            <span className='created'>Created: {po.createdAt}</span></div>
            <table className='requestTable'>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
            {arr.map(item =>
                <tr key={item.id} className='border'>
                <td className='name'>{item.code}</td>
                <td className='address'>{item.description}</td>
                <td>{item.poQuantity}</td>
                </tr>)}
            </table>
            <button className='void' >Void</button>
            </div>
            </>

            )
}

export default ItemListPO;
