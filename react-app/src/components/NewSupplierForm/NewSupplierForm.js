import React, {  useState }from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import * as SuppliersActions from '../../store/suppliers'
import './NewSupplierForm.css'

function NewSupplierForm() {
   const dispatch = useDispatch();
   const {closeModal} = useModal();


    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [cell, setCell] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault();
        const supplier = {name, address, contact, email, cell}
        await dispatch(SuppliersActions.createSupplier(supplier))
        .then(closeModal())
    }

    return (
        <>
        <div className='modalSupplierContainer'>
        <form onSubmit = {onSubmit}>
         <div className='titleNewSupplier'>Create New Supplier</div>
         <div className='newSupplierName'> Name:
            <input
                type='text'
                value={name}
                placeholder='enter supplier name'
                onChange={e => setName(e.target.value)}>
            </input>
         </div>
         <div className='newSupplierAddress'> Address:
            <textarea
                type='text'
                value={address}
                placeholder='enter supplier address'
                onChange={e => setAddress(e.target.value)}>
            </textarea>
         </div>
         <div className='newSupplierContact'> Contact:
            <input
                type='text'
                value={contact}
                placeholder='enter contact name'
                onChange={e => setContact(e.target.value)}>
            </input>
         </div>
         <div className='newSupplierEmail'> Email:
            <input
                type='text'
                value={email}
                placeholder='enter supplier email'
                onChange={e => setEmail(e.target.value)}>
            </input>
         </div>
         <div className='newSupplierCell'> Cell:
            <input
                type='text'
                value={cell}
                placeholder='enter supplier cell'
                onChange={e => setCell(e.target.value)}>
            </input>
         </div>

         <div className='newSupplierSubmit'>
            <button id='newSupplierSubmit' onClick={e => onSubmit(e)}>Submit</button>
         </div>
        </form>
        </div>
        </>
    )
}

export default NewSupplierForm;
