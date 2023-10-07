import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import './EditItem.css'

function EditItem({itemId}) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();


    const this_item = useSelector(state => (Object.values(state.items)).filter(item => item.id === itemId))


    const [code] = useState(this_item[0].code)
    const [description, setDescription] = useState(this_item[0].description)
    const [item_type, setItem_Type] = useState(this_item[0].item_type)
    const [unit_cost, setUnit_Cost] = useState(this_item[0].unit_cost)
    const [quantity, setQuantity] = useState(this_item[0].quantity)
    const [manufacturer, setManufacturer] = useState(this_item[0].manufacturer)
    // const [supplier, setSupplier] = useState(this_item[0].supplier)
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    const sanitizedString = unit_cost.replace(/,/g, '');
    const numericRegex = /^[0-9]+(\.[0-9]+)?$/;

    useEffect(() => {

      if (unit_cost && !numericRegex.test(sanitizedString)) {
          let errors = ['Not a valid Unit Value']
          setErrors(errors)
          setDisabled(true)


      }  else if (quantity && !+quantity) {
          let errors = ['Not a valid Quantity']
          setErrors(errors)
          setDisabled(true)


      } else {
          setErrors([])
          setDisabled(false)
          setUnit_Cost(sanitizedString)
      }

  }, [code, quantity, unit_cost])

    const onSubmit = async (e) => {
        e.preventDefault()

         const item = {code, description, item_type, unit_cost, quantity, manufacturer};
         const data = await dispatch(ItemsActions.editItem(item, itemId))
         if (data) {
            setErrors(data)
         } else {
         closeModal()
       }
    }


    return (
        <>
        <div className='modalContainerEditItem'>
        <form onSubmit = {onSubmit} className='formBodyEditItem'>
         <div className='titleEditItem'>Edit This Item</div>
         <div className='errors-editItem'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
        </ul>
        </div>
         <div className='editItemCode'> Item Code:
            <span>{code}</span>
         </div>
         <div className='editItemDes'> Description:
            <textarea
                value={description}
                placeholder='enter item description'
                onChange={e => setDescription(e.target.value)}
                required>
            </textarea>
         </div>
         <div className='editItemType'> Item Type:
            <select
                value={item_type}
                onChange={e => setItem_Type(e.target.value)}
                required>
                <option value='' disabled>Select Type</option>
                <option value='motor'>Motor</option>
                <option value='pt'>Pressure Transmitter</option>
                <option value='tt'>Temperature Transmitter</option>
                <option value='ls'>Level Switch</option>
                <option value='contact'>Contact</option>
                <option value='pump'>Pump</option>
                <option value='chemical'>Chemical</option>
            </select>
         </div>
         <div className='editUnitValue'> Unit Value:
            <input
                value={unit_cost}
                placeholder='enter item value'
                onChange={e => setUnit_Cost(e.target.value)}
                required>
            </input>
         </div>
         <div className='editQuantity'> Quantity:
            <input
                value={quantity}
                placeholder='enter item quantity'
                onChange={e => setQuantity(e.target.value)}
                required>
            </input>
         </div>
         <div className='editManufacturer'> Manufacturer:
            <input
                type='text'
                value={manufacturer}
                placeholder='enter item manufacturer'
                onChange={e => setManufacturer(e.target.value)}
                required>
            </input>
         </div>
         {/* <div className='newSupplier'>Supplier:
            <select
                value={supplier}
                onChange={e => setSupplier(e.target.value)}>
                <option value='' disabled>Select Supplier</option>
                {supplierList.map(supplier =>
                <><option value={supplier.id}>{supplier.name}</option></>)}
            </select>
         </div> */}
         <div className='editSubmit'>
            <button id='editSubmit' disabled={disabled}>Submit</button>
            <button id='editCancel' onClick={() => closeModal()}>Cancel</button>
         </div>
        </form>
        </div>
        </>
    )
}

export default EditItem;
