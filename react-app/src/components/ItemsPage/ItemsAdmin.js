import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import SuppliersList from '../SuppliersPage/SuppliersList';
import OpenModalButton from '../OpenModalButton';
import './ItemsAdmin.css'

function ItemsAdmin() {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
    }, [dispatch])

    const items = useSelector(state => Object.values(state.items))

    // const supplierList = async (itemId) => {

    //     await
    // }


    return (
        <>
        {/* <h2>Inventory</h2> */}
    <table>
        <tbody>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Type</th>
            <th>Unit Value</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Manufacturer</th>
            <th>Suppliers</th>
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
             <td><OpenModalButton
                    buttonText='View Supplier'
                    modalComponent={<SuppliersList itemId={item.id}/>}
                    /></td>
          </tr>)}
        </tbody>
    </table>
    
        </>
    )
}

export default ItemsAdmin;
