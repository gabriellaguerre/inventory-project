import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'
import SuppliersList from '../SuppliersPage/SuppliersList';
import AddSupplier from '../SuppliersPage/AddSupplier';
import EditItem from '../EditItem/EditItem';
import DeleteItem from '../DeleteItem/DeleteItem';
import OpenModalButton from '../OpenModalButton';
import './ItemsAdmin.css'

function ItemsAdmin() {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
    }, [dispatch])

    const items = useSelector(state => Object.values(state.items).filter(item => item.deleted === false))


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
            <th style={{width: '100px'}}>Suppliers</th>
            <th>Edit Item</th>
            <th>Delete Item</th>
          </tr>
             {items.map(item =>
             <tr key={item.id} className="item">
             <td>{item.code}</td>
             <td id='description'>{item.description}</td>
             <td>{item.item_type}</td>
             <td>${item.unit_cost}</td>
             <td>{item.quantity}</td>
             <td>${item.unit_cost*item.quantity}</td>
             <td>{item.manufacturer}</td>
             <td><OpenModalButton
                    className='supList'
                    buttonText='Supplier List'
                    modalComponent={<SuppliersList itemId={item.id}/>}
                    />
                  <OpenModalButton
                    className='supList'
                    buttonText='+ Supplier'
                    modalComponent={<AddSupplier itemId={item.id}/>}
                    />
                    </td>
              <td><OpenModalButton
                      className='editItem'
                      buttonText= 'Edit Item'
                      modalComponent={<EditItem itemId={item.id}/>}
                      /></td>
              <td><OpenModalButton
                      className='deleteItem'
                      buttonText= 'Delete Item'
                      modalComponent={<DeleteItem itemId={item.id}/>}
                      /></td>
          </tr>)}
        </tbody>
    </table>

        </>
    )
}

export default ItemsAdmin;
