import React, { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useModal } from "../../context/Modal";
import * as SuppliersActions from '../../store/suppliers'

function NewSupplierForm() {
   const dispatch = useDispatch();
//    const {closeModal} = useModal();

    useEffect(()=> {
        dispatch(SuppliersActions.getSuppliers())
    },[dispatch])

    // const supplierList = useSelector(state => Object.values(state.suppliers))


    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [cell, setCell] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        // await dispatch(ItemsActions.createItem(item))
    }

    return (
        <>
        <form onSubmit = {onSubmit}>
         <div>Create New Supplier</div>
         <div> Name:
            <input
                type='text'
                value={name}
                placeholder='enter supplier name'
                onChange={e => setName(e.target.value)}>
            </input>
         </div>
         <div> Address:
            <textarea
                type='text'
                value={address}
                placeholder='enter supplier address'
                onChange={e => setAddress(e.target.value)}>
            </textarea>
         </div>
         <div> Contact:
            <input
                type='text'
                value={contact}
                onChange={e => setContact(e.target.value)}>
            </input>
         </div>
         <div> Email:
            <input
                type='text'
                value={email}
                placeholder='enter supplier email'
                onChange={e => setEmail(e.target.value)}>
            </input>
         </div>
         <div> Cell:
            <input
                type='text'
                value={cell}
                placeholder='enter supplier cell'
                onChange={e => setCell(e.target.value)}>
            </input>
         </div>

         <div>
            <button onClick={e => onSubmit(e)}>Submit</button>

         </div>
        </form>
        </>
    )
}

export default NewSupplierForm;
