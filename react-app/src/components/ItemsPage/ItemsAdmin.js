import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import './ItemsAdmin.css'

function ItemsAdmin() {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
    }, [dispatch])

    const items = useSelector(state => Object.values(state.items))


    return (
        <>
        {/* <h2>Inventory</h2> */}
    <table>
        <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Type</th>
            <th>Unit Value</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Manufacturer</th>
        </tr>
             {items.map(item =>
             <tr key={item.id} className="item">
             <td>{item.code}</td>
             <td>{item.description}</td>
             <td>{item.item_type}</td>
             <td>${item.unit_cost}</td>
             <td>{item.quantity}</td>
             <td>${item.unit_cost*item.quantity}</td>
             <td>{item.manufacturer}</td>
             </tr>)}

    </table>
        </>
    )
}

export default ItemsAdmin;
