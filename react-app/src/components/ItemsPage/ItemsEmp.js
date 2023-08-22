import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import './ItemsEmp.css'

function ItemsEmp() {

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
            <th>Quantity</th>
            <th>Manufacturer</th>
        </tr>
             {items.map(item =>
             <tr key={item.id} className="item">
             <td>{item.code}</td>
             <td>{item.description}</td>
             <td>{item.item_type}</td>
             <td>{item.quantity}</td>
             <td>{item.manufacturer}</td>
             </tr>)}

    </table>
        </>
    )

}

export default ItemsEmp;
