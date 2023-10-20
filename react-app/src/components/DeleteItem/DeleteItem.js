import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import * as ItemsActions from '../../store/items'
import './DeleteItem.css';

function DeleteItem({itemId, updatePage}) {
  //  const history = useHistory()

    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const current_item = useSelector(state => (Object.values(state.items)).filter(item => item.id === itemId))

    const handleSubmit = async () => {
        console.log('IN HANDLE SUBMIT OF DELETE')
        // console.log("IN ELSE STATEMENT DELETE MODAL")
        await dispatch(ItemsActions.deleteItem(itemId))
        .then(dispatch(ItemsActions.resetState()))
        updatePage(0)
        closeModal()
        // await dispatch(ItemsActions.deleteItem(itemId))
        // .then(async () => {
        //  if(updatePage === 0) {
        //     await dispatch(ItemsActions.deleteItem(itemId))

        //  } else {
        //     await dispatch(ItemsActions.deleteItem(itemId))
        //     updatePage(0)
        //  }
        // })
        // if(updatePage === 0) {
        //     console.log("IN IF STATEMENT DELETE MODAL")
        //     await dispatch(ItemsActions.deleteItem(itemId))
        //     .then(dispatch(ItemsActions.resetState()))
        //     .then(closeModal())

        //  } else {
        //     console.log("IN ELSE STATEMENT DELETE MODAL")
        //     await dispatch(ItemsActions.deleteItem(itemId))
        //     .then(dispatch(ItemsActions.resetState()))
        //     updatePage(0)
        //     closeModal()
        //  }


        // .then(await dispatch(ItemsActions.getItemsByPage(0)))

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
