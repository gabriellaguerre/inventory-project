import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as SuppliersActions from '../../store/suppliers'
import OpenModalButton from '../OpenModalButton';
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm';
import './NewRequestForm.css'

function NewRequestForm() {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
    },[dispatch])

    const itemList = useSelector(state => Object.values(state.items))


    const [itemCode, setItemCode] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')



    const onSubmit = async (e) => {
        e.preventDefault()

        const req = {itemCode, quantity};


    }

    return (
        <>
        <div className='modalContainer'>
        <form onSubmit = {onSubmit}>
         <div className='titleNewItem'>Create New Request</div>
         <div className='newItemCode'> Item Code:
            <select
                value={itemCode}
                onChange={e => setItemCode(e.target.value)}>
                <option value='' disabled>Select Item</option>
                {itemList.map(item =>
                <><option value={item.id} onChange={e => setDescription(item.description)}>{item.code}</option></>)}
            </select>
         </div>
         <div className='ItemDes'> Description:
            <textarea>{description}</textarea>
         </div>

         <div className='newQuantity'> Quantity:
            <input
                value={quantity}
                placeholder='enter item quantity'
                onChange={e => setQuantity(e.target.value)}>
            </input>
         </div>

         <div className='newSubmit'>
            <button id='newSubmit' onClick={e => onSubmit(e)}>Submit</button>
         </div>
        </form>
        </div>
        </>
    )
}

export default NewRequestForm;
