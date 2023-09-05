import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as SuppliersActions from '../../store/suppliers'
import OpenModalButton from '../OpenModalButton';
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm';
import './NewItemForm.css'

function NewItemForm() {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

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
    const [errors, setErrors] = useState([])

    const item = useSelector(state => Object.values(state.items).filter(item => item.code === (+code)))

    const onSubmit = async (e) => {
        e.preventDefault()

        if((+code) === item[0]?.code) {
            let errors = ['This code number cannot be used.  Enter new code']
            setErrors(errors)
         } else {
        const item = {code, description, item_type, unit_cost, quantity, manufacturer};
        const data = await dispatch(ItemsActions.createItem(item));
        if (data) {
            setErrors(data)
        } else {
            // dispatch(ItemsActions.getAllItems())
            closeModal()
        }
        if (supplier) {
            dispatch(SuppliersActions.connectSupplierToNewItem(supplier))
            .then(closeModal())
        }
    }
    }

    return (
        <>
        <div className='modalContainer'>
        <form onSubmit = {onSubmit}>
         <div className='titleNewItem'>Create New Item</div>
         <div className='errors'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
        </ul>
        </div>
         <div className='newItemCode'> Item Code:
            <input
                value={code}
                placeholder='enter item code'
                onChange={e => setCode(e.target.value)}>
            </input>
         </div>
         <div className='newItemDes'> Description:
            <textarea

                value={description}
                placeholder='enter item description'
                onChange={e => setDescription(e.target.value)}>
            </textarea>
         </div>
         <div className='newItemType'> Item Type:
            <select

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
         <div className='newUnitValue'> Unit Value:
            <input

                value={unit_cost}
                placeholder='enter item value'
                onChange={e => setUnit_Cost(e.target.value)}>
            </input>
         </div>
         <div className='newQuantity'> Quantity:
            <input

                value={quantity}
                placeholder='enter item quantity'
                onChange={e => setQuantity(e.target.value)}>
            </input>
         </div>
         <div className='newManufacturer'> Manufacturer:
            <input
                type='text'
                value={manufacturer}
                placeholder='enter item manufacturer'
                onChange={e => setManufacturer(e.target.value)}>
            </input>
         </div>
         <div className='newSupplier'>Supplier:
            <select
                value={supplier}
                onChange={e => setSupplier(e.target.value)}>
                <option value='' disabled>Select Supplier</option>
                {supplierList.map(supplier =>
                <><option value={supplier.id}>{supplier.name}</option></>)}
            </select>
         </div>
         <div className='newSubmit'>
            <button id='newSubmit' onClick={e => onSubmit(e)}>Submit</button>
            {/* <span className='addNewSupplier'><OpenModalButton
                    buttonText='Add New Supplier'
                    modalComponent={<NewSupplierForm />}
                    /></span> */}
         </div>
        </form>
        </div>
        </>
    )
}

export default NewItemForm;
