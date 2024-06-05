import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import * as POITEMsActions from '../../store/purchase_order_items'
import * as POsActions from '../../store/purchase_orders';


function PrintList({pos}) {
    console.log("IN PRINTLISTffffffffffffffffffffff")
    const dispatch = useDispatch();
    console.log(pos, 'bbbbbbbbbbbbbbbbbbbb')

    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
        dispatch(POITEMsActions.getAllPOItems())
        dispatch(POsActions.getAllPOS())
    },[dispatch])


    // const poItems = useSelector(state => (Object.values(state.purchase_order_items)));
    // const po = useSelector(state=>state.purchase_orders)
    // const item = useSelector(state=> state.items)
    // const user = useSelector(state => state.user)

    const user = useSelector(state => {
        console.log('Redux state:', state); // Log the entire Redux state
        return state.user; // Return the user state
    });

    console.log('PrintList component:', pos, user);
    return null;
}

export default PrintList;
