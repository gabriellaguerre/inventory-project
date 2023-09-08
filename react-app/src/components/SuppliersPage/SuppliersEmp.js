import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as SuppliersActions from '../../store/suppliers'
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import OpenModalButton from '../OpenModalButton';
import './SuppliersEmp.css'

function SuppliersEmp() {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(SuppliersActions.getSuppliers())
    }, [dispatch])

    const suppliers = useSelector(state => Object.values(state.suppliers))


    return (
        <>
        {/* <h2>Inventory</h2> */}
    <table className = 'suppliers-table-employee'>
    <thead>
        <tr>
        <td className='header' style={{textAlign:'center'}} colSpan = '11'><button  id='requestForm'><OpenModalButton
             buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
             modalComponent={<NewRequestForm />}/></button>
          <button id='poForm'><OpenModalButton
                    buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                    modalComponent={<NewPOForm />}/></button>
                    <button className='POs'>
        <NavLink to='/purchase_orders' id='POs'><i className="fa-regular fa-eye"></i> POs</NavLink></button>
       <button className='requests'>
        <NavLink to='/requests' id='requests'><i className="fa-regular fa-eye"></i> Requests</NavLink></button>
        <button className='items'>
        <NavLink to='/items' id='items'><i className="fa-regular fa-eye"></i>Items</NavLink></button>
        </td>
        </tr>
        <tr className='labels'>
        <th>Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Cell</th>
        </tr>
        </thead>
        <tbody>
        {suppliers.map(supplier =>
         <tr key={supplier.id} className="supplier">
         <td>{supplier.name}</td>
         <td id='address'>{supplier.address}</td>
         <td>{supplier.contact}</td>
         <td>{supplier.email}</td>
         <td>{supplier.cell}</td>
        </tr>)}
        </tbody>
    </table>
        </>
    )

}

export default SuppliersEmp;
