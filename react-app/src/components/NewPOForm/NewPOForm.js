import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as POsActions from '../../store/purchase_orders'
import * as PurchaseOrderItemsActions from '../../store/purchase_order_items'
import './NewPOForm.css'

function NewPOForm() {
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
    const [disabled, setDisabled] = useState(false)

    const itemList = useSelector(state => Object.values(state.items))
    const thisItem1 = useSelector(state => state.items[itemId1])
    const thisItem2 = useSelector(state => state.items[itemId2])
    const thisItem3 = useSelector(state => state.items[itemId3])


    useEffect(()=> {
        let validationErrors = {}

        if (itemId1.length === 0 && itemId2.length === 0 && itemId3.length === 0) {
            setDisabled(true)
            console.log('1st if')
        } else if (itemId1.length > 0 && quantity1.length === 0 && itemId2.length === 0 && itemId3.length === 0)  {
            setDisabled(true)
            console.log('2nd if')
        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length === 0 && itemId3.length === 0){
            setDisabled(false)
            console.log('3rd if')
        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length === 0 && itemId3.length === 0) {
            setDisabled(true)
            console.log('4th if')
        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length > 0 && itemId1 !== itemId2 && itemId3.length === 0) {
            setDisabled(false)
            console.log('5th if')
        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length > 0 && itemId3.length > 0 && quantity3.length === 0) {
            setDisabled(true)
            console.log('6th if')
        } else if (itemId1.length > 0 && quantity1.length > 0
                && itemId2.length > 0 && quantity2.length > 0 &&
                itemId3.length > 0 && quantity3.length > 0 && (itemId1 !== itemId2) && (itemId1 !== itemId3) && (itemId2 !== itemId3)) {
                    setDisabled(false)
                    console.log('7th if')
        } else {
            setDisabled(true)
            validationErrors.errors = '*2 items on the list have the same code'
            console.log('else')
        }

        if(quantity1 > thisItem1?.quantity) {
            validationErrors.errors = '*Quantity requested for item #1 is greater than quantity in stock'
            setDisabled(true)
        }
        if(quantity2 > thisItem2?.quantity) {
            validationErrors.errors = '*Quantity requested for item #2 is greater than quantity in stock'
            setDisabled(true)
        }
        if(quantity3 > thisItem3?.quantity) {
            validationErrors.errors = '*Quantity requested for item #3 is greater than quantity in stock'
            setDisabled(true)
        }

        if(validationErrors) {
            setErrors(validationErrors)
        } else {
            setErrors({})
        }

    }, [itemId2, itemId3, itemId1, quantity1, quantity2, quantity3, thisItem1, thisItem2, thisItem3, disabled])


    const onSubmit = async (e) => {
        e.preventDefault()

        let info1 = {itemId1, quantity1}
        let info2 = {itemId2, quantity2};
        let info3 = {itemId3, quantity3};
        await dispatch(POsActions.createPurchaseOrder())


        if (itemId1 && quantity1 && itemId2 && quantity2 && itemId3 && quantity3) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(async ()=> {itemId = itemId2; quantity = quantity2; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity})) })
           .then(async ()=> {itemId = itemId3; quantity = quantity3; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity})) })
           .then(dispatch(ItemsActions.getAllItems()))
           .then(closeModal())
        } else if (itemId1 && quantity1 && itemId2 && quantity2) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(async ()=> {itemId = itemId2; quantity = quantity2; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity})) })
           .then(dispatch(ItemsActions.getAllItems()))
           .then(closeModal())
        } else if (itemId1 && quantity1 ) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(dispatch(POsActions.getPOS()))
            .then(dispatch(ItemsActions.getAllItems()))
            .then(closeModal())
        }

    }

    return (
        <>
        <div className='poformmodalContainer'>
        <form onSubmit = {onSubmit}>
         <div className='titleNewItem'>Create New Purchase Order</div>
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
                <button id='reqNoCreate' type='submit' disabled={disabled}>Submit</button>

         </div>
        </form>
        </div>
        </>
    )
}

export default NewPOForm;
