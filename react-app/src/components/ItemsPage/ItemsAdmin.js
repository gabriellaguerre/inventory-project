import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'

function ItemsAdmin() {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
    }, [dispatch])

    const items = useSelector(state => Object.values(state.items))
  

    return (
        <>
        {/* <h2>Inventory</h2> */}
        {items.map(item =>
             <div key={item.id} className="item">
             <div>Code: {item.code}</div>
             <div>Description: {item.description}</div>
             <div>Type: {item.item_type}</div>
             <div>Unit Cost: ${item.unit_cost}</div>
             <div>Quantity: {item.quantity}</div>
             <div>Total Cost: ${item.unit_cost*item.quantity}</div>
             <div>Manufacturer: {item.manufacturer}</div>
             </div>)}
        </>
    )
}

export default ItemsAdmin;
