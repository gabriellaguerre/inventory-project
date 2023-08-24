import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useModal } from "../../context/Modal";
// import ItemsActions from '../../store/items';
import * as SuppliersActions from '../../store/suppliers'
import OpenModalButton from '../OpenModalButton';
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm';

function NewItemForm() {
    const dispatch = useDispatch();
    // const {closeModal} = useModal();

    useEffect(()=> {
        dispatch(SuppliersActions.getSuppliers())
    },[dispatch])

    const supplierList = useSelector(state => Object.values(state.suppliers))


    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [item_type, setItem_Type] = useState('')
    const [unit_cost, setUnit_Cost] = useState('')
    const [quantity, setQuantity] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [supplier, setSupplier] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        // await dispatch(ItemsActions.createItem(item))
    }

    return (
        <>
        <form onSubmit = {onSubmit}>
         <div>Create New Item</div>
         <div> Item Code:
            <input
                type='text'
                value={code}
                placeholder='enter item code'
                onChange={e => setCode(e.target.value)}>
            </input>
         </div>
         <div> Description:
            <textarea
                type='text'
                value={description}
                placeholder='enter item description'
                onChange={e => setDescription(e.target.value)}>
            </textarea>
         </div>
         <div> Item Type:
            <select
                type='text'
                value={item_type}
                onChange={e => setItem_Type(e.target.value)}>
                <option value='' disabled>Select Type</option>
                <option value='motor'>Motor</option>
                <option value='pt'>Pressure Transmitter</option>
                <option value='tt'>Temperature Transmitter</option>
                <option value='ls'>Level Switch</option>
                <option value='contact'>Contact</option>
                <option value='pump'>Pump</option>
                <option value='chemical'>Chemical</option>
            </select>
         </div>
         <div> Unit Value:
            <input
                type='text'
                value={unit_cost}
                placeholder='enter item value'
                onChange={e => setUnit_Cost(e.target.value)}>
            </input>
         </div>
         <div> Quantity:
            <input
                type='text'
                value={quantity}
                placeholder='enter item quantity'
                onChange={e => setQuantity(e.target.value)}>
            </input>
         </div>
         <div> Manufacturer:
            <input
                type='text'
                value={manufacturer}
                placeholder='enter item manufacturer'
                onChange={e => setManufacturer(e.target.value)}>
            </input>
         </div>
         <div>Supplier:
            <select
                value={supplier}
                onChange={e => setSupplier(e.target.value)}>
                <option value='' disabled>Select Supplier</option>
                {supplierList.map(supplier =>
                <><option value={supplier.id}>{supplier.name}</option></>)}
            </select>
         </div>
         <div>
            <button onClick={e => onSubmit(e)}>Submit</button>
            <OpenModalButton
                    buttonText='Add New Supplier'
                    modalComponent={<NewSupplierForm />}
                    />
         </div>
        </form>
        </>
    )
}

export default NewItemForm;
