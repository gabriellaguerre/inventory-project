import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as ItemsActions from '../../store/items'
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import OpenModalButton from '../OpenModalButton';
import './ItemsEmp.css'

function ItemsEmp() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [disable, setDisable] = useState(false)


    useEffect(()=> {
        dispatch(ItemsActions.resetState())
        dispatch(ItemsActions.getItemsByPage(page))
    },[dispatch, page])

    const items = useSelector(state => Object.values(state.items))

    useEffect(()=> {
        if ((page+2) > items[items.length-1]) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    },[page, disable, items])

    let newItems = []
    for (let i = 0; i < (items.length-1);i++) {
        let item = items[i]
        newItems.push(item)
    }

    // const previous = (page) => {
    //     if (page>0) dispatch(ItemsActions.resetState())
    // }

    return (
        <>
        {/* <h2>Inventory</h2> */}
        <div id='pagination'>
        <button id='previous' onClick={()=> {if (page>0) setPage(page-1); }}>Previous</button>
        <span id='page'>Page {page+1} of {' '}{items[items.length-1]}</span>
        <button id='next' onClick={()=> {setPage(page+1); }} disabled={disable}>Next</button>
        </div>
    <table className = 'items-table-employee'>
        <thead>
        <tr>
             <td className='header' style={{textAlign:'center'}} colSpan = '11'><button  id='requestForm'><OpenModalButton
             buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
             modalComponent={<NewRequestForm />}/></button>
          <button id='poForm'><OpenModalButton
                    buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                    modalComponent={<NewPOForm />}/></button>
                    <button className='POs'>
        <NavLink to='/purchase_orders' id='POs'><i className="fa-regular fa-eye"></i> POs</NavLink></button>
       <button className='requests'>
        <NavLink to='/requests' id='requests'><i className="fa-regular fa-eye"></i> Requests</NavLink></button>
        <button className='suppliers'>
        <NavLink to='/suppliers' id='suppliers'><i className="fa-regular fa-eye"></i> Suppliers</NavLink></button>
        </td>
        </tr>
        <tr className='labels'>
            <th>Code</th>
            <th>Description</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Mfr</th>
        </tr>
        </thead>
        <tbody>
             {newItems.map(item =>
             <tr key={item.id} className="item">
             <td>{item.code}</td>
             <td id='description'>{item.description}</td>
             <td>{item.item_type}</td>
             <td>{item.quantity}</td>
             <td>{item.manufacturer}</td>
             </tr>)}
        </tbody>

    </table>
        </>
    )

}

export default ItemsEmp;
