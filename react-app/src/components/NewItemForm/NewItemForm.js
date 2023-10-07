import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as SuppliersActions from '../../store/suppliers'
// import OpenModalButton from '../OpenModalButton';
// import NewSupplierForm from '../NewSupplierForm/NewSupplierForm';
import './NewItemForm.css'

function NewItemForm() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    useEffect(() => {
        dispatch(SuppliersActions.getSuppliers())
        dispatch(ItemsActions.resetState())
        dispatch(ItemsActions.getAllItemsWithDeleteTrue())
    }, [dispatch])

    const supplierList = useSelector(state => Object.values(state.suppliers))
    // console.log(supplierList, 'SUPPLIER')


    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [item_type, setItem_Type] = useState('')
    const [unit_cost, setUnit_Cost] = useState('')
    const [quantity, setQuantity] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [supplier, setSupplier] = useState('')
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    // const item = useSelector(state => Object.values(state.items).filter(item => item.code === (+code)))
    // console.log(item, 'ITEM')
    const item = useSelector(state => (state.items))
    const ItemArray = Object.values(item)
    let newArray = []
    for (let i = 0; i < ItemArray.length-1; i++){
        let item = ItemArray[i]
        newArray.push(item)
    }

    useEffect(()=> {
        if (code && !+code) {
            let errors = ['Item Code should only be numbers']
            setErrors(errors)
            setDisabled(true)
        } else {
            setErrors([])
            setDisabled(false)
        }
    },[code])



    // useEffect(()=> {
    //     if ((+code) === sameCode) {
    //         let errors = ['This Item Code cannot be used.  Enter a new code']
    //         setErrors(errors)
    //         setDisabled(true)
    //     } else {
    //         setErrors([])
    //         setDisabled(false)
    //     }
    // },[code, sameCode])

    useEffect(() => {

        if (unit_cost && !+unit_cost) {
            let errors = ['Not a valid Unit Cost']
            setErrors(errors)
            setDisabled(true)


        }  else if (quantity && !+quantity) {
            let errors = ['Not a valid Quantity']
            setErrors(errors)
            setDisabled(true)


        } else {
            setErrors([])
            setDisabled(false)
        }

    }, [quantity, unit_cost])

    const onSubmit = async (e) => {
        e.preventDefault()

        const sameCode = newArray.filter(item => item.code === (+code))

        if(sameCode.length) {
            setErrors(['This Item Code cannot be used.  Enter a new code'])
            setDisabled(true)
        } else {
            setErrors([])
            setDisabled(false)
            const item1 = { code, description, item_type, unit_cost, quantity, manufacturer };
            const data = await dispatch(ItemsActions.createItem(item1));
            // dispatch(ItemsActions.resetState())
            // dispatch(ItemsActions.getAllItems())

            if (data) {
                setErrors(data)
            } else {
            await dispatch(ItemsActions.resetState())
            .then(await dispatch(ItemsActions.getItemsByPage(0)))
            .then(()=> closeModal())
        }
        if (supplier) {
            dispatch(SuppliersActions.connectSupplierToNewItem(supplier))
                .then(()=>closeModal())
        }
        }



    }

    return (
        <>
            <div className='modalContainerNewItem'>
                <form onSubmit={onSubmit} className='formBodyItem'>
                    <div className='titleNewItem'>Create New Item</div>
                    <div className='errors-newItem'>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx} style={{ color: 'red' }}>{error}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='newItemCode'> Item Code:{' '}
                        <input
                            value={code}
                            placeholder='enter item code'
                            onChange={e => setCode(e.target.value)}
                            required>

                        </input>
                    </div>
                    <div className='newItemDes'> Description:{' '}
                        <textarea

                            value={description}
                            placeholder='enter item description'
                            onChange={e => setDescription(e.target.value)}
                            required>
                        </textarea>
                    </div>
                    <div className='newItemType'> Item Type:{' '}
                        <select
                            value={item_type}
                            onChange={e => setItem_Type(e.target.value)}
                            required>
                            <option value='' disabled>Select Type</option>
                            <option value='motor'>Motor</option>
                            <option value='pt'>Pressure Transmitter</option>
                            <option value='tt'>Temperature Transmitter</option>
                            <option value='ft'>Flow Transmitter</option>
                            <option value='ls'>Level Switch</option>
                            <option value='genfilter'>Generator Filter</option>
                            <option value='servo'>Servo Motor</option>
                            <option value='contact'>Contact</option>
                            <option value='pump'>Pump</option>
                            <option value='pump-seal'>Pump Seal</option>
                            <option value='chemical'>Chemical</option>
                        </select>
                    </div>
                    <div className='newUnitValue'> Unit Cost:{' '}$
                        <input
                            type='numeric'
                            value={unit_cost}
                            placeholder='enter item value'
                            onChange={e => setUnit_Cost(e.target.value)}
                            required>
                        </input>
                    </div>
                    <div className='newQuantity'> Quantity:{' '}
                        <input

                            value={quantity}
                            placeholder='enter item quantity'
                            onChange={e => setQuantity(e.target.value)}
                            required>
                        </input>
                    </div>
                    <div className='newManufacturer'> Manufacturer:{' '}
                        <input
                            type='text'
                            value={manufacturer}
                            placeholder='enter item manufacturer'
                            onChange={e => setManufacturer(e.target.value)}
                            required>
                        </input>
                    </div>
                    <div className='newSupplier'>Supplier:{' '}
                        <select
                            value={supplier}
                            onChange={e => setSupplier(e.target.value)}
                           >
                            <option value='' disabled>Select Supplier</option>
                            {supplierList.map(supplier =>
                                <><option value={supplier.id}>{supplier.name}</option></>)}
                        </select>
                    </div>
                    <div className='newSubmit'>
                        <button id='newSubmit' disabled={disabled}>Submit</button>
                        <span className='cancel'><button id='cancel' onClick={() => closeModal()}>Cancel</button></span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewItemForm;
