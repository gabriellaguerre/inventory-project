import React, {  useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as PurchaseOrderItemsActions from '../../store/purchase_order_items'
import './EditItemListPO.css'

function EditItemListPO({posId}) {
   const dispatch = useDispatch();
   const {closeModal} = useModal();

    const this_poitemList = useSelector(state => (Object.values(state.purchase_order_items)).filter(positem => positem.purchase_orderId === posId))
    console.log(this_poitemList[0].purchase_orderId, 'OOOOOOOOOOOOOOO')

    const [itemId1, setItemCode1] = useState(this_poitemList[0].itemId)
    const [itemId2, setItemCode2] = useState(this_poitemList[1]?.itemId)
    const [itemId3, setItemCode3] = useState(this_poitemList[2]?.itemId)
    const [quantity1, setQuantity1] = useState(this_poitemList[0].quantity)
    const [quantity2, setQuantity2] = useState(this_poitemList[1]?.quantity)
    const [quantity3, setQuantity3] = useState(this_poitemList[2]?.quantity)
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(false)

    const poitem = useSelector(state => state.purchase_order_items)
    const thisItem1 = useSelector(state => state.items[itemId1])
    const thisItem2 = useSelector(state => state.items[itemId2])
    const thisItem3 = useSelector(state => state.items[itemId3])


    const onSubmit = async (e) => {
        e.preventDefault()

        let poId = this_poitemList[0].purchase_orderId;
        if (itemId1 && quantity1 && itemId2 && quantity2 && itemId3 && quantity3) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity}))
            .then(async ()=> {itemId = itemId2; quantity = quantity2; await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity})) })
           .then(async ()=> {itemId = itemId3; quantity = quantity3; await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity})) })
        //    .then(dispatch(ItemsActions.getAllItems()))
           .then(closeModal())
        } else if (itemId1 && quantity1 && itemId2 && quantity2) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity}))
            .then(async ()=> {itemId = itemId2; quantity = quantity2; await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity}))})
        //    .then(dispatch(ItemsActions.getAllItems()))
           .then(closeModal())
        } else if (itemId1 && quantity1 ) {
            let itemId = itemId1
            let quantity = quantity1
            await dispatch(PurchaseOrderItemsActions.editPOItem(poId, itemId, {quantity}))
            // .then(dispatch(POsActions.getPOS()))
            // .then(dispatch(ItemsActions.getAllItems()))
            .then(closeModal())
        }
    }

    return (
        <>
        <div className='poformmodalContainer'>
        <form onSubmit = {onSubmit}>
         <div className='titleNewItem'>Edit Purchase Order: {this_poitemList[0].purchase_orderId}</div>
         <div className='error'>
                {errors.errors && (<p>{errors.errors}</p>)}
            </div>

         <table>
            <th>Item Code</th>
            <th>Description</th>
            <th>Quantity</th>
            <tr>
            <td>{thisItem1?.code}</td>
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
            <td>{thisItem2?.code}</td>
            <td>{thisItem2?.description}</td>
            <td>
            {thisItem2 ? (
                 <input
                 value={quantity2}
                 placeholder='enter item quantity'
                 onChange={e => setQuantity3(e.target.value)}>
             </input>
            ):(
                <></>
            )}
            </td>
            </tr>
            <tr>
            <td>{thisItem3?.code}</td>
            <td>{thisItem3?.description}</td>
            <td>
            {thisItem3 ? (
                 <input
                 value={quantity3}
                 placeholder='enter item quantity'
                 onChange={e => setQuantity3(e.target.value)}>
             </input>
            ):(
                <></>
            )}

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

export default EditItemListPO;
