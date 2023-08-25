import React, { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
import {useSelector, useDispatch} from 'react-redux';
import * as SuppliersActions from '../../store/suppliers'
import './AddSupplier.css'

function AddSupplier({itemId}) {

    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const [supplierId, setSupplierId] = useState('')

    useEffect(()=> {
        dispatch(SuppliersActions.getSuppliers())
    }, [dispatch])

    const supplierList = useSelector(state => Object.values(state.suppliers))
    const item1 = useSelector(state => (Object.values(state.items)).filter(item => item.id === itemId));

    const addSupplier = async () => {
        await dispatch(SuppliersActions.connectSupplierToItem(itemId, supplierId))
        .then(closeModal())
    }

    return (
        <>
        <div className='modalContainer'>
        <div className='titleAddSupplier'>Add Another Supplier to this Item</div>
        <div className='itemId'>Item Code: {item1[0].code}</div>
        <div className='itemType'>Item Type: {item1[0].item_type}</div>
        <div className='itemDes'>Item Description: {item1[0].description}</div>
        <div className='itemId'>Supplier:
            <select
                value={supplierId}
                onChange={e => setSupplierId(e.target.value)}>
                <option value='' disabled>Select Supplier</option>
                {supplierList.map(supplier =>
                <><option key={supplier.id} value={supplier.id}>{supplier.name}</option></>)}
            </select>
            </div>
        <div className='addSupplier'><button id='addSupplier'onClick={()=> addSupplier()}>Add Supplier</button></div>
        </div>
        </>
    )
}

export default AddSupplier;
