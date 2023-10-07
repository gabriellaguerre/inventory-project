import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import * as ItemsActions from '../../store/items'
import './DeleteItem.css';

function DeleteItem({itemId}) {

    const dispatch = useDispatch()
    const {closeModal} = useModal()


    const current_item = useSelector(state => (Object.values(state.items)).filter(item => item.id === itemId))



    const handleSubmit = async () => {
        await dispatch(ItemsActions.deleteItem(itemId))
        await dispatch(ItemsActions.resetState())
        await dispatch(ItemsActions.getItemsByPage(0))
        closeModal()
    }


    return (

        <div className="modalDeleteItem">
            <div id="delete-title" className="titleDeleteItem">Delete this Item ?</div>
            <div className='dItemCode'>Item Code: {current_item[0]?.code}</div>
            <div className='dItemDes'>Description: {current_item[0]?.description}</div>

            <div className='deleteItemButton'><button  id="yesItem" onClick={() => handleSubmit()}>Yes</button>
                <span><button id="noItem" onClick={closeModal}>No</button></span>
                </div>

        </div>


    )
}

export default DeleteItem;
