import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as ItemsActions from '../../store/items'
import SuppliersList from '../SuppliersPage/SuppliersList';
import AddSupplier from '../SuppliersPage/AddSupplier';
import EditItem from '../EditItem/EditItem';
import DeleteItem from '../DeleteItem/DeleteItem';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm'
import './ItemsAdmin.css'

function ItemsAdmin({user}) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [disable, setDisable] = useState(false)
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [isSearching, setIsSearching] = useState(false)


    useEffect(()=>{
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


    const searchAction = async () => {
        if (query && !filter) {
            console.log('Please choose a filter')
        } else {
            dispatch(ItemsActions.resetState())
            dispatch(ItemsActions.searchItems({query, filter}))
            setIsSearching(true)
        }

    }

    const clearSearch = async () => {
        setIsSearching(false)
        setFilter('')
        setQuery('')
        dispatch(ItemsActions.resetState())
        dispatch(ItemsActions.getItemsByPage(page))
    }

    return (
        <>
        {(isSearching) ? (
            <div id='isSearching'>Full List of Search Results</div>
        ) : (
            <div id='pagination'>
            <button id='previous' onClick={()=> {if (page>0) setPage(page-1); }}>Previous</button>
            <span id='page'>Page {page+1} of {' '}{items[items.length-1]}</span>
            <button id='next' onClick={()=> {setPage(page+1);  }} disabled={disable}>Next</button>
            </div>
        )}

        <div className='search'>
            <input id='search'
             value={query}
             placeholder='Choose a filter and type your search'
             onChange={(e)=>setQuery(e.target.value)}
             />
             <button onClick={()=>searchAction()}><i className="fa-solid fa-magnifying-glass"></i></button>
             <button onClick={()=>clearSearch()}><i className="fa-solid fa-broom"></i></button>

        </div>
        <div id='filter'>
            Filter by: <button onClick={()=> setFilter('code')}>code</button>
            <button onClick={()=> setFilter('description')}>description</button>
            <button onClick={()=> setFilter('type')}>type</button>

        </div>
    <table className = 'items-table-admin'>
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
                    modalComponent={<NewItemForm updatePage={setPage}/>}/></button>
         <button id='supplierForm'><OpenModalButton
                    buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Supplier</span>
                    modalComponent={<NewSupplierForm />}/></button>
        {/* <button style={{width: 'auto', height: '15px', backgroundColor: 'white', border: 'none'}}></button> */}
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
            <th>Unit Value</th>
            <th>Qty</th>
            <th>Total Value</th>
            <th>Mfr</th>
            <th >Supplier List</th>
            <th>Add Supplier</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
             {newItems.map(item =>
             <tr key={item.id} className="item">
             <td>{item.code}</td>
             <td id='description'>{item.description}</td>
             <td>{item.item_type}</td>
             <td>${item.unit_cost}</td>
             <td>{item.quantity}</td>
             <td>${item.total_value}</td>
             <td>{item.manufacturer}</td>
             <td><div id="supplierList"><OpenModalButton
                    id='suppbutton'
                    buttonText=<div className='supList'><i id='eye'className="fa-regular fa-eye"></i></div>
                    modalComponent={<SuppliersList itemId={item.id}/>}
                    /></div></td>
             <td><OpenModalButton
                    buttonText=<div className='addsupplier'><i className="fa-solid fa-circle-plus"></i></div>
                    modalComponent={<AddSupplier itemId={item.id}/>}
                    /></td>
              <td><OpenModalButton
                      buttonText=<div className='edit'><i className="fa-solid fa-pencil"></i></div>
                      modalComponent={<EditItem itemId={item.id}/>}
                      /></td>
              <td><OpenModalButton
                      buttonText=<div className='delete'><i className="fa-regular fa-trash-can"></i></div>
                      modalComponent={<DeleteItem itemId={item.id} updatePage={setPage}/>}
                      /></td>
          </tr>)}
        </tbody>
    </table>

    </>
    )
}

export default ItemsAdmin;
