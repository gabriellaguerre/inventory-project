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
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [chooseCode, setChooseCode] = useState(false)
    const [chooseDesc, setChooseDesc] = useState(false)
    const [chooseType, setChooseType] = useState(false)

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

    const searchAction = async () => {
        if (query && !filter) {
            alert('Please Choose A Filter.')
        } else if (!query && filter) {
            alert('Please Fill Out The Search Field.')
        } else if (!query && !filter) {
            alert('All The Fields Are Empty.  Please Fill Them Out.')
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
        setChooseCode(false);
        setChooseDesc(false);
        setChooseType(false);
        dispatch(ItemsActions.resetState())
        dispatch(ItemsActions.getItemsByPage(page))
    }

    const chooseFilterCode = 'search' + (chooseCode ? "Yes" : "No")
    const chooseFilterDesc = 'search' + (chooseDesc ? "Yes" : "No")
    const chooseFilterType = 'search' + (chooseType ? "Yes" : "No")

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
             <button className='searchClear' onClick={()=>searchAction()}><i className="fa-solid fa-magnifying-glass"></i></button>
             <button className='searchClear' onClick={()=>clearSearch()}><i className="fa-solid fa-broom"></i></button>

        </div>
        <div id='filter'>
            Filter by: <button id={chooseFilterCode} className='cdtButton' onClick={()=> {setFilter('code'); setChooseCode(true); setChooseDesc(false); setChooseType(false)}}>Code</button>
            <button id={chooseFilterDesc} className='cdtButton' onClick={()=> {setFilter('description'); setChooseCode(false); setChooseDesc(true); setChooseType(false)}}>Description</button>
            <button id={chooseFilterType} className='cdtButton' onClick={()=> {setFilter('type'); setChooseCode(false); setChooseDesc(false); setChooseType(true)}}>Type</button>

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
