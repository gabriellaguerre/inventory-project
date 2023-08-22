import React, { useEffect } from 'react';
import { useModal } from "../../context/Modal";
import {useSelector, useDispatch} from 'react-redux';
import * as SuppliersActions from '../../store/suppliers'
import * as ItemsActions from '../../store/items'



function SuppliersList({itemId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    useEffect(()=> {
    dispatch(SuppliersActions.resetState())
    .then(dispatch(SuppliersActions.getItemSuppliers(itemId)))
    .then(dispatch(ItemsActions.getAllItems()))
    },[dispatch, itemId])

    const supplierList = useSelector(state => Object.values(state.suppliers))
    const item1 = useSelector(state => (Object.values(state.items)));


    let arr = [];
    for(let i = 0; i < item1.length; i++){
        let item = item1[i];
        if (item.id === itemId) {
            arr.push(item)
        }
    }


    return (
            <>
            <div>Supplier List for Item Code: {arr[0].code}</div>
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
