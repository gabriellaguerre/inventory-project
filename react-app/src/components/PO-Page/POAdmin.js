import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as POsActions from '../../store/purchase_orders';
import * as UsersActions from '../../store/user';
import ItemListPO from '../ItemsPage/ItemListPO';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm'
import './POAdmin.css';



function POAdmin() {
    const dispatch = useDispatch()


    const [page, setPage] = useState(0)
    const [disable, setDisable] = useState(false)

    useEffect(()=> {
        dispatch(UsersActions.get_Users())
        dispatch(POsActions.resetState())
        dispatch(POsActions.getPOSByPage(page))

    }, [dispatch, page])

    const purchase_orders = useSelector(state => Object.values(state.purchase_orders))
    const user = useSelector(state => state.user)

    useEffect(()=> {
        if ((page+2) > purchase_orders[purchase_orders.length-1]) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    },[page, disable, purchase_orders])

    let newPOs = []
    for (let i = 0; i < (purchase_orders.length-1);i++) {
        let po = purchase_orders[i]
        newPOs.push(po)
    }

    // const previous = (page) => {
    //     if (page>0) dispatch(POsActions.resetState())
    //     previous(page)
    // }

    return (
        <>
            <div id='pagination'>
            <button id='previous' onClick={()=> {if (page>0) setPage(page-1); }}>Previous</button>
            <span id='page'>Page {page+1} of {' '}{purchase_orders[purchase_orders.length-1]}</span>
            <button id='next' onClick={()=> {setPage(page+1);}} disabled={disable}>Next</button>
            </div>
            <table className='po-table-admin'>
            <thead>
            <tr>
              <td className='header' style={{textAlign:'center'}} colSpan = '11'><button  id='requestForm'><OpenModalButton
                 buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
                 modalComponent={<NewRequestForm />}/></button>
              <button id='poForm'><OpenModalButton
                        buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                        modalComponent={<NewPOForm updatePage={setPage}/>}/></button>
              <button id='itemForm'><OpenModalButton
                        buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Item</span>
                        modalComponent={<NewItemForm />}/></button>
             <button id='supplierForm'><OpenModalButton
                        buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Supplier</span>
                        modalComponent={<NewSupplierForm />}/></button>

            <button className='items'>
            <NavLink to='/items' id='POs'><i className="fa-regular fa-eye"></i> Items</NavLink></button>
           <button className='requests'>
            <NavLink to='/requests' id='requests'><i className="fa-regular fa-eye"></i> Requests</NavLink></button>
            <button className='suppliers'>
            <NavLink to='/suppliers' id='suppliers'><i className="fa-regular fa-eye"></i> Suppliers</NavLink></button>
            </td>
            </tr>
            <tr className='labels'>
                <th>Status</th>
                <th>Purchase Order ID</th>
                <th>Date Created</th>
                <th>Created By</th>
                <th>View Purchase Order</th>
            </tr>
            </thead>
            <tbody>
             {newPOs.reverse().map(pos =>
             <tr key={pos.id} className='requestBox'>
            {pos.received ? (
                <td><div id='received'>received</div></td>
            ):(
                <td><div id='open'>open</div></td>
            )}
            <td>{pos.id}</td>
            <td>{pos.createdAt}</td>
            <td>{user[pos.userId]?.employeeID}</td>
            <td>
            <div className='poView'>
             <OpenModalButton
                  buttonText=<div><i className="fa-regular fa-eye"></i></div>
                  modalComponent={<ItemListPO posId={pos.id}/>}/></div></td>
             </tr>)}
             </tbody>
            </table>
        </>
    )
    }

export default POAdmin;
