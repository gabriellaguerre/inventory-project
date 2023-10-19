import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import * as ItemsActions from '../../store/items'
import './DeleteItem.css';

function DeleteItem({itemId}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()


    const current_item = useSelector(state => (Object.values(state.items)).filter(item => item.id === itemId))



    const handleSubmit = async () => {
        await dispatch(ItemsActions.deleteItem(itemId))
        .then(await dispatch(ItemsActions.resetState()))
        .then(await dispatch(ItemsActions.getItemsByPage(0)))
        .then(history.push('/items'))
        .then(closeModal())
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
