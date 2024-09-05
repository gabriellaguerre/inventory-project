import React, {  useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as PurchaseOrderItemsActions from '../../store/purchase_order_items'
import './EditItemListPO.css'

function EditItemListPO({posId}) {
    console.log("HELLO")
   const dispatch = useDispatch();
   const {closeModal} = useModal();

    const this_poitemList = useSelector(state => (Object.values(state.purchase_order_items)).filter(positem => positem.purchase_orderId === posId))


    const [itemId1] = useState(this_poitemList[0].itemId)
    const [itemId2] = useState(this_poitemList[1]?.itemId)
    const [itemId3] = useState(this_poitemList[2]?.itemId)
    const [quantity1, setQuantity1] = useState(this_poitemList[0].quantity)
    const [quantity2, setQuantity2] = useState(this_poitemList[1]?.quantity)
    const [quantity3, setQuantity3] = useState(this_poitemList[2]?.quantity)
    const [price1, setPrice1] = useState(this_poitemList[0].price)
    const [price2, setPrice2] = useState(this_poitemList[1]?.price)
    const [price3, setPrice3] = useState(this_poitemList[2]?.price)
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    // const poitem = useSelector(state => state.purchase_order_items)
    const thisItem1 = useSelector(state => state.items[itemId1])
    const thisItem2 = useSelector(state => state.items[itemId2])
    const thisItem3 = useSelector(state => state.items[itemId3])

    useEffect(()=> {
        if ((quantity1 && !+quantity1) || (quantity2 && !+quantity2) || (quantity3 && !+quantity3)) {
            let errors = ['*Enter a valid Quantity']
            setDisabled(true)
            setErrors(errors)
        } else {
            setDisabled(false)
            setErrors([])
        }

    }, [quantity1, quantity2, quantity3])


    const onSubmit = async (e) => {
        e.preventDefault()

        let poId = this_poitemList[0].purchase_orderId;
        // console.log(poId, 'POID IN ON SUBMIT OF EDITITEMLISTPO')
        let items = [{itemId: itemId1, quantity: quantity1, price: price1},
                     {itemId: itemId2, quantity: quantity2, price: price2},
                     {itemId: itemId3, quantity: quantity3, price: price3}
                  ]

        items = items.filter(item => item.itemId && +item.quantity);
        for (const { itemId, quantity, price } of items) {
            await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, { quantity, price }));
        }
        closeModal()
        // if (itemId1 && +quantity1 && itemId2 && +quantity2 && itemId3 && +quantity3) {
        //     let itemId = itemId1
        //     let quantity = quantity1
        //     let price = price1
        //     await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity, price}))
        //     .then(async ()=> {itemId = itemId2; quantity = quantity2; price = price2; await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity, price})) })
        //    .then(async ()=> {itemId = itemId3; quantity = quantity3; price = price3; await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity, price})) })
        // //    .then(dispatch(ItemsActions.getAllItems()))
        //    .then(closeModal())
        // } else if (itemId1 && +quantity1 && itemId2 && +quantity2) {
        //     let itemId = itemId1
        //     let quantity = quantity1
        //     let price = price1
        //     await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity, price}))
        //     .then(async ()=> {itemId = itemId2; quantity = quantity2; await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity, price}))})
        // //    .then(dispatch(ItemsActions.getAllItems()))
        //    .then(closeModal())
        // } else if (itemId1 && +quantity1 ) {
        //     let itemId = itemId1
        //     let quantity = quantity1
        //     let price = price1
        //     await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity, price}))
        //     // .then(dispatch(POsActions.getPOS()))
        //     // .then(dispatch(ItemsActions.getAllItems()))
        //     .then(closeModal())
        // }
    }

    return (
        <>
        <div className='editpoformmodalContainer'>
         <div className='titleEditPO'>Edit Purchase Order: {this_poitemList[0].purchase_orderId}</div>
         <div className='error-editpo-form'>
         <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
        </ul>
            </div>
         <form onSubmit = {onSubmit}>
         <table className='edit-po-form'>
         <thead>
            <tr className='labels'>
            <th>Item Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            </tr>
          </thead>
            <tbody>
            <tr>
            <td>{thisItem1?.code}</td>
            <td>{thisItem1?.description}</td>
            <td>
            <input
                className='quantity'
                value={quantity1}
                placeholder='enter item quantity'
                onChange={e => setQuantity1(e.target.value)}>
            </input>
            </td>
            <td>
            <input
                className='price'
                value={price1}
                // placeholder='price'
                onChange={e => setPrice1(e.target.value)}>
            </input>
            </td>
            </tr>
            <tr>
            {thisItem2 ? (
            <>
            <td>{thisItem2?.code}</td>
            <td>{thisItem2?.description}</td>
            <td>
                 <input
                className='quantity'
                 value={quantity2}
                 placeholder='enter item quantity'
                 onChange={e => setQuantity2(e.target.value)}>
             </input></td>
               <td>
               <input
                   className='price'
                   value={price2}
                //    placeholder='price'
                   onChange={e => setPrice2(e.target.value)}>
               </input></td>
               </>
            ):(
                <></>
            )}

            </tr>
            {thisItem3 ? (
            <>
            <tr>
            <td>{thisItem3?.code}</td>
            <td>{thisItem3?.description}</td>
            <td>
                 <input
                 className='quantity'
                 value={quantity3}
                 placeholder='enter item quantity'
                 onChange={e => setQuantity3(e.target.value)}>
             </input></td>
             <td>
               <input
               className='price'
                   value={price3}
                //    placeholder='price'
                   onChange={e => setPrice3(e.target.value)}>
               </input></td>
             </tr>
             </>

            ):(
                <></>
            )}

          </tbody>
        </table>
         <div className='editPOSubmit'>
                <button id='editPOCreate' type='submit' disabled={disabled}>Submit</button>
                <button id='CanceleditPo' onClick={()=>closeModal()}>Cancel</button>
         </div>
        </form>
        </div>
        </>
    )
}

export default EditItemListPO;
