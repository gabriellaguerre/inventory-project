import React, {  useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import * as SuppliersActions from '../../store/suppliers'
import './EditSupplier.css'

function EditSupplier({supplierId}) {
   const dispatch = useDispatch();
   const {closeModal} = useModal();

    const this_supplier = useSelector(state => (Object.values(state.suppliers)).filter(supplier => supplier.id === supplierId))

    const [name, setName] = useState(this_supplier[0].name)
    const [address, setAddress] = useState(this_supplier[0].address)
    const [contact, setContact] = useState(this_supplier[0].contact)
    const [email, setEmail] = useState(this_supplier[0].email)
    const [cell, setCell] = useState(this_supplier[0].cell)
    const [errors, setErrors] = useState([])


    const onSubmit = async (e) => {
        e.preventDefault();
        const supplier = {name, address, contact, email, cell}
        const data = await dispatch(SuppliersActions.editSupplier(supplier, supplierId))
        if (data) {
            setErrors(data)
        } else {
        <Redirect to='/suppliers'/>
        closeModal()
     }
    }

    return (
        <>
        <div className='modalEditSupplierContainer'>
        <form onSubmit = {onSubmit} className='formBodyEditSupplier'>
         <div className='titleEditSupplier'>Edit New Supplier</div>
         <div className='errors-editSupplier'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
        </ul>
        </div>
         <div className='editSupplierName'> Name:
            <input
                type='text'
                value={name}
                placeholder='enter supplier name'
                onChange={e => setName(e.target.value)}>
            </input>
         </div>
         <div className='editSupplierAddress'> Address:
            <textarea
                type='text'
                value={address}
                placeholder='enter supplier address'
                onChange={e => setAddress(e.target.value)}>
            </textarea>
         </div>
         <div className='editSupplierContact'> Contact:
            <input
                type='text'
                value={contact}
                placeholder='enter contact name'
                onChange={e => setContact(e.target.value)}>
            </input>
         </div>
         <div className='editSupplierEmail'> Email:
            <input
                type='text'
                value={email}
                placeholder='enter supplier email'
                onChange={e => setEmail(e.target.value)}>
            </input>
         </div>
         <div className='editSupplierCell'> Cell:
            <input
                type='text'
                value={cell}
                placeholder='enter supplier cell'
                onChange={e => setCell(e.target.value)}>
            </input>
         </div>

         <div className='editSupplierSubmit'>
            <button id='editSupplierSubmit' onClick={e => onSubmit(e)}>Submit</button>
            <button id='editCancel' onClick={()=>closeModal()}>Cancel</button>
         </div>
        </form>
        </div>
        </>
    )
}

export default EditSupplier;
