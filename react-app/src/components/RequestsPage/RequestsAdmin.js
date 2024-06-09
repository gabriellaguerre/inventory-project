import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as RequestsActions from '../../store/requests';
import * as UsersActions from '../../store/user';
import * as ItemsActions from '../../store/items';
import * as ReqITEMsActions from '../../store/request_items'
import ItemListReq from '../ItemsPage/ItemListReq';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm'
import SearchRequestByDate from '../SearchRequestByDate/SearchRequestByDate.js'
import './RequestsAdmin.css'



function RequestsAdmin() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [disable, setDisable] = useState(false)
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [chooseVoidedReq, setChooseVoidedReq] = useState(false)
    const [chooseAppliedReq, setChooseAppliedReq] = useState(false)
    const [chooseID, setChooseID] = useState(false)
    const [chooseRangeDate, setChooseRangeDate] = useState(false)
    const [chooseUserID, setChooseUserID] = useState(false)
    const [searchDisabled, setSearchDisabled] = useState(false)
    const [searchDates, setSearchDates] = useState({startDate: null, endDate: null})




    useEffect(()=> {
        dispatch(UsersActions.get_Users())
        dispatch(RequestsActions.resetState())
        dispatch(RequestsActions.getRequestsByPage(page))
        dispatch(ItemsActions.getAllItems())
        dispatch(ReqITEMsActions.getAllReqItems())

    }, [dispatch, page])

    const requests = useSelector(state => Object.values(state.requests))
    const user = useSelector(state => state.user)
    const item = useSelector(state=> state.items)
    const reqItems = useSelector(state => (Object.values(state.request_items)))



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
        setChooseVoidedReq(false)
        setChooseAppliedReq(false)
        setChooseID(false)
        setChooseRangeDate(false)
        setChooseUserID(false)
        setSearchDisabled(false)
        setSearchDates({startDate: null, endDate: null})
        dispatch(UsersActions.get_Users())
        dispatch(RequestsActions.resetState())
        dispatch(RequestsActions.getRequestsByPage(page))
    }

    const chooseFilterVoidedReq = 'search' + (chooseVoidedReq ? "Yes" : "No")
    const chooseFilterAppliedReq = 'search' + (chooseAppliedReq ? "Yes" : "No")
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
    const handlePrint = () => {

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const imageStyles = `
            <style>
            .sigImg {
                width: 300px;
                height: 50px;

            }
            .poTable {
                border-collapse: collapse;
                margin: 25px 0;
                font-size: 0.9em;
                width: 700px;
                overflow: hidden;
            }
            .poTable th, .poTable td {
                border: 1px solid black;
                padding: 8px;
            }
            .poTable th {
                text-align: center;

            }
            .poTable td {
                text-align: left;
            }
            .itemCodeCol {
                width: 100px;
            }
            .descriptionCol {
                width: 500px;
            }
            .quantityCol {
                width: 50px;
                text-align: center;
            }
            .line {

            }
            </style>
        `;
            printWindow.document.write(`<html><head><title>Purchase Orders</title> ${imageStyles}</head><body>`);
            printWindow.document.write('<h1>Purchase Orders</h1>');
            printWindow.document.write('<ul>');

            newReqs.forEach(req => {
                const id = req.id;
                const image = req.image;
                printWindow.document.write(`<h3>Purchase Order ID: ${req.id}</h3>`);
                printWindow.document.write(`<div>Date Created: ${req.createdAt}</div>`);
                printWindow.document.write(`<div>Created By: ${user[req.userId]?.employeeID}</div>`);
                printWindow.document.write(`<table class="poTable"><thead><tr>`);
                printWindow.document.write(`<th class="itemCodeCol">Item Code</th><th class="descriptionCol">Description</th><th class="quantityCol">Qty</th></tr></thead><tbody>`);

                const printReqItems = reqItems.filter(reqitem => reqitem.purchase_orderId === id)
                printReqItems.forEach(reqitem => {
                    printWindow.document.write(`<tr>`);
                    printWindow.document.write(`<td>${item[reqitem.itemId].code}</td>`)
                    printWindow.document.write(`<td>${item[reqitem.itemId].description}</td>`)
                    printWindow.document.write(`<td>${reqitem.quantity}</td>`)
                    printWindow.document.write(`</tr>`);
                })

                printWindow.document.write(`</tbody></table>`);
                printWindow.document.write(`<div>Signed: <img class="sigImg" src="${req.image}" alt="signature" /></div>`)
                printWindow.document.write('<div class="line">==========================</div>');

            });


            printWindow.document.write('</ul>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();

            printWindow.onload = () => {
                printWindow.print();
            };

        } else {
            alert('Popup blocked. Please enable popups to print the items.');
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
             <button className='searchClear' onClick={()=>searchAction()}><i className="fa-solid fa-magnifying-glass"></i>Search</button>
             <button className='searchClear' onClick={()=>clearSearch()}><i className="fa-solid fa-broom"></i>{" "}Clear</button>
             <button className='print' onClick={()=>handlePrint()}><i className="fa-solid fa-print"></i>{" "}Print</button>
        </div>
        <div id='filter'>
            Filter by: <button id={chooseFilterAppliedReq} className='sidcButton' onClick={()=> {setFilter('voidedFalse'); setChooseAppliedReq(true); setChooseVoidedReq(false); setChooseID(false); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(true)}}>Applied Requests</button>
            <button id={chooseFilterVoidedReq} className='sidcButton' onClick={()=> {setFilter('voidedTrue'); setChooseAppliedReq(false); setChooseVoidedReq(true); setChooseID(false); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(true)}}>Voided Requests</button>
            <button id={chooseFilterID} className='sidcButton' onClick={()=> {setFilter('id'); setChooseAppliedReq(false); setChooseVoidedReq(false); setChooseID(true); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(false)}}>Request ID</button>
            <button id={chooseFilterDate} className='sidcButton' onClick={()=> {setFilter('createdAt'); setChooseAppliedReq(false); setChooseVoidedReq(false); setChooseID(false); setChooseRangeDate(true); setChooseUserID(false); setSearchDisabled(false)}}><OpenModalButton
                                    buttonText=<div>Date</div>
                                    modalComponent={<SearchRequestByDate onDateSubmit={handleSearchDate}/>}/></button>
            <button id={chooseFilterUserID} className='sidcButton' onClick={()=> {setFilter('userId'); setChooseAppliedReq(false); setChooseVoidedReq(false); setChooseID(false); setChooseRangeDate(false); setChooseUserID(true); setSearchDisabled(false)}}>Created By</button>
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
