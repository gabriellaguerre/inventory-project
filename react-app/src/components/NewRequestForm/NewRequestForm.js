import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as RequestsActions from '../../store/requests'
import './NewRequestForm.css'

function NewRequestForm() {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    useEffect(()=> {
        dispatch(ItemsActions.getAllItems())
    },[dispatch])

    const [itemId1, setItemCode1] = useState('')
    const [itemId2, setItemCode2] = useState('')
    const [itemId3, setItemCode3] = useState('')
    const [quantity1, setQuantity1] = useState('')
    const [quantity2, setQuantity2] = useState('')
    const [quantity3, setQuantity3] = useState('')
    const [errors, setErrors] = useState({})


    useEffect(()=> {
        let validationErrors = {}

        if ((itemId1.length === 0 && itemId2.length === 0) || (itemId1.length === 0  && itemId3.length === 0) || (itemId2.length === 0 && itemId3.length === 0)) {
            validationErrors.errors = ''
        } else if (itemId2 === itemId1 || itemId3 === itemId1 || itemId3 === itemId2) {
            validationErrors.errors = '*2 or more Items with the same code number are on the list'
        }

        if(validationErrors) {
            setErrors(validationErrors)
        } else {
            setErrors({})
        }

    }, [itemId2, itemId3, itemId1])

    const itemList = useSelector(state => Object.values(state.items))
    const thisItem1 = useSelector(state => state.items[itemId1])
    const thisItem2 = useSelector(state => state.items[itemId2])
    const thisItem3 = useSelector(state => state.items[itemId3])

    // console.log(thisItem, 'ID IN CREATE REQUEST COMPONENT')

    const onSubmit = async (e) => {
        e.preventDefault()
        let info1;
        // let info2;
        // let info3;

        if (itemId1 && quantity1) {
           let itemId = itemId1
           let quantity = quantity1
           info1 = {itemId, quantity}
           dispatch(RequestsActions.createRequest(info1))
        } 
    }



    return (
        <>
        <div className='reqformmodalContainer'>
        <form onSubmit = {onSubmit}>
         <div className='titleNewItem'>Create New Request</div>
         <div className='error'>
                {errors.errors && (<p>{errors.errors}</p>)}
            </div>

         <table>
            <th>Item Code</th>
            <th>Description</th>
            <th>Quantity</th>
            <tr>
            <select
                value={itemId1}
                onChange={e => {setItemCode1(e.target.value)}}>
                <option value='' disabled>(Select Item)</option>
                {itemList.map(item =>
                <><option value={item.id}>{item.code}</option></>)}
            </select>
            <td>{thisItem1?.description}</td>
            <td>
            <input
                value={quantity1}
                placeholder='enter item quantity'
                onChange={e => setQuantity1(e.target.value)}>
            </input>
            </td>
            </tr>
            <tr>
            <select
                value={itemId2}
                onChange={e => {setItemCode2(e.target.value)}}>
                <option value='' disabled>(Select Item)</option>
                {itemList.map(item =>
                <><option value={item.id}>{item.code}</option></>)}
            </select>
            <td>{thisItem2?.description}</td>
            <td>
            <input
                value={quantity2}
                placeholder='enter item quantity'
                onChange={e => setQuantity2(e.target.value)}>
            </input>
            </td>
            </tr>
            <tr>
            <select
                value={itemId3}
                onChange={e => {setItemCode3(e.target.value)}}>
                <option value='' disabled>(Select Item)</option>
                {itemList.map(item =>
                <><option value={item.id} >{item.code}</option></>)}
            </select>
            <td>{thisItem3?.description}</td>
            <td>
            <input
                value={quantity3}
                placeholder='enter item quantity'
                onChange={e => setQuantity3(e.target.value)}>
            </input>
            </td>
            </tr>
        </table>
         <div className='newSubmit'>
         {itemId2 === itemId1 || itemId3 === itemId1 || itemId3 === itemId2 ? (
                <button id='reqNoCreate' type='submit' disabled={true}>Submit</button>
            ) : (
                <button id='reqCreate' type='submit' disabled={false}>Submit</button>
            )}
            {/* <button id='newSubmit' {disabled} onClick={e => onSubmit(e)}>Submit</button> */}
         </div>
        </form>
        </div>
        </>
    )
}

export default NewRequestForm;
