import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as RequestsActions from '../../store/requests';
import * as UsersActions from '../../store/user';
import ItemListReq from '../ItemsPage/ItemListReq';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm'
import './RequestsAdmin.css'



function RequestsAdmin() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [disable, setDisable] = useState(false)
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [chooseOpenPO, setChooseOpenPO] = useState(false)
    const [chooseReceivedPO, setChooseReceivedPO] = useState(false)
    const [chooseID, setChooseID] = useState(false)
    const [chooseRangeDate, setChooseRangeDate] = useState(false)
    const [chooseUserID, setChooseUserID] = useState(false)
    const [searchDisabled, setSearchDisabled] = useState(false)
    const [searchDates, setSearchDates] = useState({startDate: null, endDate: null})




    useEffect(()=> {
        dispatch(UsersActions.get_Users())
        dispatch(RequestsActions.resetState())
        dispatch(RequestsActions.getRequestsByPage(page))

    }, [dispatch, page])

    const requests = useSelector(state => Object.values(state.requests))
    const user = useSelector(state => state.user)

    useEffect(()=> {
        if ((page+2) > requests[requests.length-1]) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    },[page, disable, requests])

    let newReqs = []
    for (let i = 0; i < (requests.length-1);i++) {
        let req = requests[i]
        newReqs.push(req)
    }

    const searchAction = async () => {
        if (query && !filter && searchDisabled===false) {
            alert('Please Choose A Filter.')
        } else if (!query && filter && searchDisabled===false) {
            alert('Please Fill Out The Search Field.')
        } else if (!query && !filter) {
            alert('All The Fields Are Empty.  Please Fill Them Out.')
        } else if (filter === 'userId') {
            handleCreatedBy()
        }else {
            dispatch(RequestsActions.resetState())
            dispatch(RequestsActions.searchRequests({query, filter}))
            setIsSearching(true)
        }
    }

    const clearSearch = async () => {
        setIsSearching(false)
        setFilter('')
        setQuery('')
        setChooseOpenPO(false)
        setChooseReceivedPO(false)
        setChooseID(false)
        setChooseRangeDate(false)
        setChooseUserID(false)
        setSearchDisabled(false)
        setSearchDates({startDate: null, endDate: null})
        dispatch(UsersActions.get_Users())
        dispatch(RequestsActions.resetState())
        dispatch(RequestsActions.getRequestsByPage(page))
    }

    const chooseFilterOpenPO = 'search' + (chooseOpenPO ? "Yes" : "No")
    const chooseFilterReceivedPO = 'search' + (chooseReceivedPO ? "Yes" : "No")
    const chooseFilterID = 'search' + (chooseID ? "Yes" : "No")
    const chooseFilterDate = 'search' + (chooseRangeDate ? "Yes" : "No")
    const chooseFilterUserID = 'search' + (chooseUserID ? "Yes" : "No")

    const handleSearchDate = (startDate, endDate) => {
        setIsSearching(false)
        setSearchDates({startDate, endDate})
    }

    const handleCreatedBy = () => {
        const userArray = Object.values(user)
        let newQuery = userArray.find(({ employeeID }) => employeeID === query)

        if(newQuery) {
            setIsSearching(true)
            dispatch(RequestsActions.resetState())
            dispatch(RequestsActions.searchRequests({query: newQuery.id, filter}))
        } else {
            alert('Either this user does not exist or there is a typo.  Please check spelling')
        }

    }


    return (
        <>
           {isSearching ? (
            <div id='isSearching'>Full List of Search Results</div>
        ) : searchDates.startDate && searchDates.endDate ? (
            <div id='isSearching' >Full List of Search Results between {searchDates.startDate} and {searchDates.endDate}</div>
        ) : (<div id='pagination'>
            <button id='previous' onClick={()=> {if (page>0) setPage(page-1); }}>Previous</button>
            <span id='page'>Page {page+1} of {' '}{requests[requests.length-1]}</span>
            <button id='next' onClick={()=> {setPage(page+1);}} disabled={disable}>Next</button>
            </div>
        )}

        <div className='search'>
            <input id='search'
             value={query}
             placeholder='Choose a filter and type your search'
             disabled={searchDisabled}
             onChange={(e)=>setQuery(e.target.value)}
             />
             <button className='searchClear' onClick={()=>searchAction()}><i className="fa-solid fa-magnifying-glass"></i></button>
             <button className='searchClear' onClick={()=>clearSearch()}><i className="fa-solid fa-broom"></i></button>

        </div>
        <div id='filter'>
            Filter by: <button id={chooseFilterOpenPO} className='sidcButton' onClick={()=> {setFilter('receivedFalse'); setChooseOpenPO(true); setChooseReceivedPO(false); setChooseID(false); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(true)}}>Open Puchase Orders</button>
            <button id={chooseFilterReceivedPO} className='sidcButton' onClick={()=> {setFilter('receivedTrue'); setChooseOpenPO(false); setChooseReceivedPO(true); setChooseID(false); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(true)}}>Received Puchase Orders</button>
            <button id={chooseFilterID} className='sidcButton' onClick={()=> {setFilter('id'); setChooseOpenPO(false); setChooseReceivedPO(false); setChooseID(true); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(false)}}>Purchase Order ID</button>
            <button id={chooseFilterDate} className='sidcButton' onClick={()=> {setFilter('createdAt'); setChooseOpenPO(false); setChooseReceivedPO(false); setChooseID(false); setChooseRangeDate(true); setChooseUserID(false); setSearchDisabled(false)}}><OpenModalButton
                                    buttonText=<div>Date</div>
                                    modalComponent={<SearchRequestByDate onDateSubmit={handleSearchDate}/>}/></button>
            <button id={chooseFilterUserID} className='sidcButton' onClick={()=> {setFilter('userId'); setChooseOpenPO(false); setChooseReceivedPO(false); setChooseID(false); setChooseRangeDate(false); setChooseUserID(true); setSearchDisabled(false)}}>Created By</button>
        </div>

            <table className='request-table-admin'>
            <thead>
            <tr>
              <td className='header' style={{textAlign:'center'}} colSpan = '11'><button  id='requestForm'><OpenModalButton
                 buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
                 modalComponent={<NewRequestForm />}/></button>
              <button id='poForm'><OpenModalButton
                        buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                        modalComponent={<NewPOForm />}/></button>
              <button id='itemForm'><OpenModalButton
                        buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Item</span>
                        modalComponent={<NewItemForm />}/></button>
             <button id='supplierForm'><OpenModalButton
                        buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Supplier</span>
                        modalComponent={<NewSupplierForm />}/></button>

            <button className='items'>
            <NavLink to='/items' id='items'><i className="fa-regular fa-eye"></i> Items</NavLink></button>
           <button className='POs'>
            <NavLink to='/purchase_orders' id='POs'><i className="fa-regular fa-eye"></i> POs</NavLink></button>
            <button className='suppliers'>
            <NavLink to='/suppliers' id='suppliers'><i className="fa-regular fa-eye"></i> Suppliers</NavLink></button>
            </td>
            </tr>
            <tr className='labels'>
                <th>Status</th>
                <th>Request ID</th>
                <th>Date Created</th>
                <th>Created By</th>
                <th>View Request</th>
            </tr>
            </thead>
            <tbody>
             {newReqs.reverse().map(request =>
             <tr key={request.id} className='requestBox'>
            {request.voided ? (
                <td><div id='voided'>voided</div></td>
            ):(
                <td><div id='applied'>applied</div></td>
            )}
            <td>{request.id}</td>
            <td>{request.createdAt}</td>
            <td>{user[request.userId]?.employeeID}</td>
            <td>
            <div className='reqView'>
             <OpenModalButton
                  buttonText=<div><i className="fa-regular fa-eye"></i></div>
                  modalComponent={<ItemListReq requestId={request.id}/>}/></div></td>
             </tr>)}
             </tbody>
         </table>
        </>
    )
    }

export default RequestsAdmin;
