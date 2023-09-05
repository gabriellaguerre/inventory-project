import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as ItemsActions from '../../store/items'
import SuppliersList from '../SuppliersPage/SuppliersList';
import AddSupplier from '../SuppliersPage/AddSupplier';
import EditItem from '../EditItem/EditItem';
import DeleteItem from '../DeleteItem/DeleteItem';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
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
    <table className = 'items-table'>
      <thead>
        <tr>
          <td colspan = '11'><OpenModalButton
             buttonText=<div><i className="fa-regular fa-plus"></i> New Request</div>
             modalComponent={<NewRequestForm />}/>
          <OpenModalButton
                    buttonText=<span><i className="fa-regular fa-plus"></i> New PO</span>
                    modalComponent={<NewPOForm />}/>
           <OpenModalButton
                    buttonText=<span><i className="fa-regular fa-plus"></i> New Item</span>
                    modalComponent={<NewItemForm />}/>

        <button className='POs'>
        <NavLink to='/purchase_orders' id='POs'><i className="fa-regular fa-eye"></i> POs</NavLink></button>
       <button className='request'>
        <NavLink to='/requests' id='requests'><i className="fa-regular fa-eye"></i> Requests</NavLink></button>
        </td>
        </tr>
        </thead>
        <tr id='lables'>
            <th>Code</th>
            <th>Description</th>
            <th>Type</th>
            <th>Unit Value</th>
            <th>Qty</th>
            <th>Total Value</th>
            <th>Mfr</th>
            <th >Supplier List</th>
            <th>Add Supplier</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>

        <tbody>
             {items.map(item =>
             <tr key={item.id} className="item">
             <td>{item.code}</td>
             <td id='description'>{item.description}</td>
             <td>{item.item_type}</td>
             <td>${item.unit_cost}</td>
             <td>{item.quantity}</td>
             <td>${item.unit_cost*item.quantity}</td>
             <td>{item.manufacturer}</td>
             <td><div id="supplierList"><OpenModalButton
                    id='suppbutton'
                    buttonText=<div className='supList'><i className="fa-regular fa-eye"></i></div>
                    modalComponent={<SuppliersList itemId={item.id}/>}
                    /></div></td>
             <td><OpenModalButton
                    buttonText=<div><i className="fa-regular fa-plus"></i></div>
                    modalComponent={<AddSupplier itemId={item.id}/>}
                    /></td>
              <td><OpenModalButton
                      buttonText=<div><i className="fa-solid fa-pencil"></i></div>
                      modalComponent={<EditItem itemId={item.id}/>}
                      /></td>
              <td><OpenModalButton
                      buttonText=<div><i className="fa-regular fa-trash-can"></i></div>
                      modalComponent={<DeleteItem itemId={item.id}/>}
                      /></td>
          </tr>)}
        </tbody>
    </table>

        </>
    )
}

export default ItemsAdmin;
