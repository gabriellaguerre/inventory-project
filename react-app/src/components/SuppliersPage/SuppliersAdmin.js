import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as SuppliersActions from '../../store/suppliers'
import EditSupplier from '../EditSupplier/EditSupplier';
import DeleteSupplier from '../DeleteSupplier/DeleteSupplier';
import OpenModalButton from '../OpenModalButton';
import './SuppliersEmp.css'



function SuppliersAdmin() {
const dispatch = useDispatch()

useEffect(()=> {
    dispatch(SuppliersActions.getSuppliers())
}, [dispatch])

const suppliers = useSelector(state => Object.values(state.suppliers))




return (
    <>
     {/* <div>Suppliers</div> */}
<table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Cell</th>
         <th>Edit</th>
         <th>Delete</th>


      </tr>
         {suppliers.map(supplier =>
         <tr key={supplier.id} className="supplier">
         <td>{supplier.name}</td>
         <td id='address'>{supplier.address}</td>
         <td>{supplier.contact}</td>
         <td>{supplier.email}</td>
         <td>{supplier.cell}</td>
         <td><OpenModalButton
                className='editSupplier'
                buttonText='Edit Supplier'
                modalComponent={<EditSupplier supplierId={supplier.id}/>}
                /></td>
        <td><OpenModalButton
                className='deleteSupplier'
                buttonText='Delete Supplier'
                modalComponent={<DeleteSupplier supplierId={supplier.id}/>}
                /></td>

      </tr>)}
    </tbody>
</table>

    </>
)
}

export default SuppliersAdmin;
