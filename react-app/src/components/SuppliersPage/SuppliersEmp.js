import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as SuppliersActions from '../../store/suppliers'
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
    <table>
        <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Cell</th>
        </tr>
        {suppliers.map(supplier =>
         <tr key={supplier.id} className="supplier">
         <td>{supplier.name}</td>
         <td id='address'>{supplier.address}</td>
         <td>{supplier.contact}</td>
         <td>{supplier.email}</td>
         <td>{supplier.cell}</td>
        </tr>)}

    </table>
        </>
    )

}

export default SuppliersEmp;
