import React, {  useState, useEffect }from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import * as SuppliersActions from '../../store/suppliers'
import './NewSupplierForm.css'

function NewSupplierForm() {
   const dispatch = useDispatch();
   const history = useHistory();
   const {closeModal} = useModal();


    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [cell, setCell] = useState('')
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    useEffect(()=> {
        if (cell && !+cell) {
            let errors = ['Cell number should only be numbers']
            setErrors(errors)
            setDisabled(true)
        } else {
            setErrors([])
            setDisabled(false)
        }
    }, [cell])

    const onSubmit = async (e) => {
        e.preventDefault();
        const supplier = {name, address, contact, email, cell}
        const data = await dispatch(SuppliersActions.createSupplier(supplier));
        if (data) {
            setErrors([data])
        } else {
            history.push('/suppliers')
            closeModal()
     }
    }

    return (
        <>
        <div className='modalNewSupplierContainer'>
        <form onSubmit = {onSubmit} className='formBodyNewSupplier'>
         <div className='titleNewSupplier'>Create New Supplier</div>
         <div className='errors-newSupplier'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
        </ul>
        </div>
         <div className='newSupplierName'> Name:{' '}
            <input
                type='text'
                value={name}
                placeholder='enter supplier name'
                onChange={e => setName(e.target.value)}
                required>
            </input>
         </div>
         <div className='newSupplierAddress'> Address:{' '}
            <textarea
                type='text'
                value={address}
                placeholder='enter supplier address'
                onChange={e => setAddress(e.target.value)}
                required>
            </textarea>
         </div>
         <div className='newSupplierContact'> Contact:{' '}
            <input
                type='text'
                value={contact}
                placeholder='enter contact name'
                onChange={e => setContact(e.target.value)}
                required>
            </input>
         </div>
         <div className='newSupplierEmail'> Email:{' '}
            <input
                type='text'
                value={email}
                placeholder='enter supplier email'
                onChange={e => setEmail(e.target.value)}
                required>
            </input>
         </div>
         <div className='newSupplierCell'> Cell:{' '}
            <input
                type='text'
                value={cell}
                placeholder='enter supplier cell'
                onChange={e => setCell(e.target.value)}
                required>
            </input>
         </div>

         <div className='newSupplierSubmit'>
            <button id='newSupplierSubmit' disabled={disabled}>Submit</button>
            <span className='newCancel'><button id='newCancel' onClick={()=>closeModal()}>Cancel</button></span>
         </div>
        </form>
        </div>
        </>
    )
}

export default NewSupplierForm;
