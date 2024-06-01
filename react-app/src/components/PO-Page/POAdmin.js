import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import * as POsActions from '../../store/purchase_orders';
import * as UsersActions from '../../store/user';
import * as ItemsActions from '../../store/items';
import * as POITEMsActions from '../../store/purchase_order_items'
import ItemListPO from '../ItemsPage/ItemListPO';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm'
import SearchPOByDate from '../SearchPOByDate/SearchPOByDate.js'
import PrintList from '../utils/PrintList.js'
import './POAdmin.css';



function POAdmin() {
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
    const [data, setData] = useState('')



    useEffect(()=> {
        dispatch(UsersActions.get_Users())
        dispatch(POsActions.resetState())
        dispatch(POsActions.getPOSByPage(page))
        dispatch(ItemsActions.getAllItems())
        dispatch(POITEMsActions.getAllPOItems())

    }, [dispatch, page])


    const purchase_orders = useSelector(state => Object.values(state.purchase_orders))
    const user = useSelector(state => state.user)
    const item = useSelector(state=> state.items)
    // const poItems = useSelector(state => (Object.values(state.purchase_order_items)).filter(positem => positem.purchase_orderId === posId));
    // console.log(poItems, 'sssssssssssssss')
    // console.log(purchase_orders, 'AFTER VARIABLE PURCHASE ORDERS')
    const poItems = useSelector(state => (Object.values(state.purchase_order_items)))
    console.log(poItems, 'ooooooooooooooooooooo')

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
            dispatch(POsActions.resetState())
            dispatch(POsActions.searchPOs({query, filter}))
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
        dispatch(POsActions.resetState())
        dispatch(POsActions.getPOSByPage(page))
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
            dispatch(POsActions.resetState())
            dispatch(POsActions.searchPOs({query: newQuery.id, filter}))
        } else {
            alert('Either this user does not exist or there is a typo.  Please check spelling')
        }

    }
    const printThis = (pos) => {
    //    console.log(pos.id, 'IN PRINT THIS FUNCTION')
    //   const poItem = poItems.filter(positem => positem.purchase_orderId === pos.Id)
    //   console.log(poItem, 'PO ITEM IN PRINT THIS')
    }

    const handlePrint = () => {

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Purchase Orders</title></head><body>');
            printWindow.document.write('<h1>Purchase Orders</h1>');
            printWindow.document.write('<ul>');

            newPOs.forEach(pos => {
                printWindow.document.write(`<div>Purchase Order ID: ${pos.id}</div>`); // Adjust as per your item structure
                printWindow.document.write(`<div>Date Created: ${pos.createdAt}</div>`);
                printWindow.document.write(`<div>Created By: ${user[pos.userId]?.employeeID}</div>`);
                printThis(pos);
                // const componentHtml = renderToString(PrintList());
                // printWindow.document.write(componentHtml);
            });


            printWindow.document.write('</ul>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
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
            <span id='page'>Page {page+1} of {' '}{purchase_orders[purchase_orders.length-1]}</span>
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
             <button className='print' onClick={()=>handlePrint()}><i className="fa-solid fa-print"></i>{" "}Print</button>

        </div>
        <div id='filter'>
            Filter by: <button id={chooseFilterOpenPO} className='sidcButton' onClick={()=> {setFilter('receivedFalse'); setChooseOpenPO(true); setChooseReceivedPO(false); setChooseID(false); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(true)}}>Open Puchase Orders</button>
            <button id={chooseFilterReceivedPO} className='sidcButton' onClick={()=> {setFilter('receivedTrue'); setChooseOpenPO(false); setChooseReceivedPO(true); setChooseID(false); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(true)}}>Received Puchase Orders</button>
            <button id={chooseFilterID} className='sidcButton' onClick={()=> {setFilter('id'); setChooseOpenPO(false); setChooseReceivedPO(false); setChooseID(true); setChooseRangeDate(false); setChooseUserID(false); setSearchDisabled(false)}}>Purchase Order ID</button>
            <button id={chooseFilterDate} className='sidcButton' onClick={()=> {setFilter('createdAt'); setChooseOpenPO(false); setChooseReceivedPO(false); setChooseID(false); setChooseRangeDate(true); setChooseUserID(false); setSearchDisabled(false)}}><OpenModalButton
                                    buttonText=<div>Date</div>
                                    modalComponent={<SearchPOByDate onDateSubmit={handleSearchDate}/>}/></button>
            <button id={chooseFilterUserID} className='sidcButton' onClick={()=> {setFilter('userId'); setChooseOpenPO(false); setChooseReceivedPO(false); setChooseID(false); setChooseRangeDate(false); setChooseUserID(true); setSearchDisabled(false)}}>Created By</button>
        </div>
            <div className='printContent'>
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
            </div>
        </>
    )
    }

export default POAdmin;

//
