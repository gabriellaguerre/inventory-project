import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as POsActions from '../../store/purchase_orders'
import * as PurchaseOrderItemsActions from '../../store/purchase_order_items'
import './NewPOForm.css'

function NewPOForm() {
    const dispatch = useDispatch();
    const history = useHistory();
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
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    const itemList = useSelector(state => Object.values(state.items).filter(item => item.deleted === false))
    const thisItem1 = useSelector(state => state.items[itemId1])
    const thisItem2 = useSelector(state => state.items[itemId2])
    const thisItem3 = useSelector(state => state.items[itemId3])


    useEffect(()=> {

        if (itemId1.length === 0 && itemId2.length === 0 && itemId3.length === 0) {
            setDisabled(true)

        } else if (itemId1.length > 0 && quantity1.length === 0 && itemId2.length === 0 && itemId3.length === 0)  {
            setDisabled(true)

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length === 0 && itemId3.length === 0 && quantity2.length === 0 && quantity3.length === 0){
            setDisabled(false)
            setErrors([])

        } else if (itemId1.length > 0 && quantity1.length > 0 && !+quantity1 && itemId2.length === 0 && itemId3.length === 0 && quantity2.length === 0 && quantity3.length === 0){
            setDisabled(true)
            let errors = ['Enter a valid Quantity']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length === 0 && itemId3.length === 0 && quantity3.length === 0 && itemId1 === itemId2) {
            setDisabled(true)
            let errors = ['*2 Items have the same Item Code']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length === 0 && itemId3.length === 0 && quantity3.length === 0 && itemId1 !== itemId2) {
            setDisabled(true)
            setErrors([])

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length > 0 && quantity2.length > 0 && +quantity2 && itemId1 !== itemId2 && itemId3.length === 0 && quantity3.length === 0) {
            setDisabled(false)
            setErrors([])

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length > 0 && quantity2.length > 0 && !+quantity2 && itemId1 !== itemId2 && itemId3.length === 0 && quantity3.length === 0) {
            setDisabled(true)
            let errors = ['Enter a valid Quantity']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length > 0 && quantity2.length > 0 && +quantity2 && itemId1 === itemId2 && itemId3.length === 0 && quantity3.length === 0) {
            setDisabled(true)
            let errors = ['*2 Items have the same Item Code']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length > 0 && itemId3.length > 0 && quantity3.length === 0
                    && itemId1 === itemId3 || itemId2 === itemId3) {
            setDisabled(true)
            let errors = ['*2 Items have the same Item Code']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length > 0 && itemId3.length > 0 && quantity3.length === 0) {
                setDisabled(true)
                setErrors([])

        } else if ((!+quantity1 && quantity1.length > 0) || (!+quantity2 && quantity2.length > 0)|| (!+quantity3 && quantity3.length > 0)) {
                let errors = ['*Enter a valid Quantity']
                setDisabled(true)
                setErrors(errors)

        } else {
                setDisabled(false)
                setErrors([])
        }

    }, [itemId2, itemId3, itemId1, quantity1, quantity2, quantity3, thisItem1, thisItem2, thisItem3, disabled])


    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(POsActions.createPurchaseOrder())

        if (itemId1 && +quantity1 && itemId2 && +quantity2 && itemId3 && +quantity3) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(async ()=> {itemId = itemId2; quantity = quantity2; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity})) })
           .then(async ()=> {itemId = itemId3; quantity = quantity3; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity})) })
           .then(dispatch(ItemsActions.getAllItems()))
           .then(history.push('/purchase_orders'))
           .then(closeModal())

        } else if (itemId1 && +quantity1 && itemId2 && +quantity2) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(async ()=> {itemId = itemId2; quantity = quantity2; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))})
           .then(dispatch(ItemsActions.getAllItems()))
           .then(history.push('/purchase_orders'))
           .then(closeModal())

        } else if (itemId1 && +quantity1 && itemId3 && +quantity3) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(async ()=> {itemId = itemId3; quantity = quantity3; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity})) })
           .then(dispatch(ItemsActions.getAllItems()))
           .then(history.push('/purchase_orders'))
           .then(closeModal())

       } else if (itemId2 && +quantity2 && itemId3 && +quantity3) {

          let itemId = itemId2
          let quantity = quantity2
          await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
         .then(async ()=> {itemId = itemId3; quantity = quantity3; await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity})) })
         .then(dispatch(ItemsActions.getAllItems()))
         .then(history.push('/purchase_orders'))
         .then(closeModal())


        } else if (itemId1 && +quantity1 ) {

            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(dispatch(POsActions.getPOS()))
            .then(dispatch(ItemsActions.getAllItems()))
            .then(history.push('/purchase_orders'))
            .then(closeModal())

        }  else if (itemId2 && +quantity2 ) {

            let itemId = itemId2
            let quantity = quantity2
              await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(dispatch(POsActions.getPOS()))
            .then(dispatch(ItemsActions.getAllItems()))
            .then(history.push('/purchase_orders'))
            .then(closeModal())

        } else if (itemId3 && +quantity3 ) {

            let itemId = itemId3
            let quantity = quantity3
              await dispatch(PurchaseOrderItemsActions.createPOItem(itemId, {quantity}))
            .then(dispatch(POsActions.getPOS()))
            .then(dispatch(ItemsActions.getAllItems()))
            .then(history.push('/purchase_orders'))
            .then(closeModal())
        }

    }

    return (
        <>
        <div className='poformmodalContainer1'>
        <div className='titleNewPO'>Create New Purchase Order</div>
         <div className='error-po-form'>
         <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
        </ul></div>
        <form onSubmit = {onSubmit}>
         <table className='new-po-form'>
            <thead>
            <tr className='labels'>
              <th>Item Code</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
            <tbody>
            <tr>
            <td>
            <select
                value={itemId1}
                onChange={e => {setItemCode1(e.target.value)}}>
              <option value='' disabled>(Select Item)</option>
                {itemList.map(item =>
                <><option value={item.id}>{item.code}</option></>)}
            </select>
            </td>
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
            <td>
            <select
                value={itemId2}
                onChange={e => {setItemCode2(e.target.value)}}>
                <option value='' disabled>(Select Item)</option>
                {itemList.map(item =>
                <><option value={item.id}>{item.code}</option></>)}
            </select>
            </td>
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
            <td>
            <select
                value={itemId3}
                onChange={e => {setItemCode3(e.target.value)}}>
                <option value='' disabled>(Select Item)</option>
                {itemList.map(item =>
                <><option value={item.id} >{item.code}</option></>)}
            </select>
            </td>
            <td>{thisItem3?.description}</td>
            <td>
            <input
                value={quantity3}
                placeholder='enter item quantity'
                onChange={e => setQuantity3(e.target.value)}>
            </input>
            </td>
            </tr>
            </tbody>
        </table>
         <div className='newSubmit'>
                <button id='CreatePo' type='submit' disabled={disabled}>Submit</button>
                <button id='CancelPo' onClick={()=>closeModal()}>Cancel</button>
         </div>
        </form>
        </div>
        </>
    )
}

export default NewPOForm;
