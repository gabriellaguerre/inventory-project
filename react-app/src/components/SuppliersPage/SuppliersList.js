import React, { useEffect } from 'react';
import { useModal } from "../../context/Modal";
import {useSelector, useDispatch} from 'react-redux';
import * as SuppliersActions from '../../store/suppliers'
import './SuppliersList.css'



function SuppliersList({itemId}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    useEffect(()=> {
     dispatch(SuppliersActions.resetState())
     dispatch(SuppliersActions.getItemSuppliers(itemId))
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
        <div className='modalContainer'>
            <div className='itemCode'>Item Code: {arr[0].code}</div>
            {supplierList.map(supplier =>
                <div key={supplier.id} className='border'>
                <div className='name'>Name: {supplier.name}</div>
                <div className='address'>Address: {supplier.address}</div>
                <div className='person'>Contact Person: {supplier.contact}</div>
                <div className='email'>Contact Email: {supplier.email}</div>
                <div className='cell'>Contact Cell: {supplier.cell}</div>
                <div className='created'>Created: {supplier.createdAt}</div>
                </div>)}
            <button className='close'onClick={closeModal}>close</button>

            </div>
            </>

            )
}

export default SuppliersList;
