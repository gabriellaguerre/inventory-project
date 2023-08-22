import React, { useEffect } from 'react';
import { useModal } from "../../context/Modal";
import {useSelector, useDispatch} from 'react-redux';
import * as SuppliersActions from '../../store/suppliers'



function SuppliersList(itemId) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(()=> {
    dispatch(SuppliersActions.getItemSuppliers(itemId))
    },[dispatch])

    const supplierList = useSelector(state => Object.values(state.suppliers))
    const theseSuppliers = supplierList.filter()

    // const user = useSelector(state => state.user)



    return (
            <>
            <div>Supplier List for Item Code: {}</div>
            {supplierList.map(supplier =>
                <div key={supplier.id}>
                <div>Supplier Name: {supplier.name}</div>
                <div>Address: {supplier.address}</div>
                <div>Contact Person: {supplier.contact}</div>
                <div>Contact Email: {supplier.email}</div>
                <div>Contact Cell: {supplier.cell}</div>
                {/* <div>{supplier.userId}</div> */}
                <div>{supplier.createdAt}</div>
                </div>)}
            <button onClick={closeModal}>close</button>
            </>

            )
}

export default SuppliersList;
