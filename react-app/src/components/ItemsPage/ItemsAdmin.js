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
    const [chooseCode, setChooseCode] = useState(false)
    const [chooseDesc, setChooseDesc] = useState(false)
    const [chooseType, setChooseType] = useState(false)



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

    // const handlePrint = () => {

    //     const printWindow = window.open('', '_blank');
    //     if (printWindow) {
    //         const imageStyles = `
    //         <style>
    //         .sigImg {
    //             width: 300px;
    //             height: 50px;

    //         }
    //         .poTable {
    //             border-collapse: collapse;
    //             margin: 25px 0;
    //             font-size: 0.9em;
    //             width: 700px;
    //             overflow: hidden;
    //         }
    //         .poTable th, .poTable td {
    //             border: 1px solid black;
    //             padding: 8px;
    //         }
    //         .poTable th {
    //             text-align: center;

    //         }
    //         .poTable td {
    //             text-align: left;
    //         }
    //         .itemCodeCol {
    //             width: 100px;
    //         }
    //         .descriptionCol {
    //             width: 500px;
    //         }
    //         .quantityCol {
    //             width: 50px;
    //             text-align: center;
    //         }
    //         .line {

    //         }
    //         </style>
    //     `;
    //         printWindow.document.write(`<html><head><title>Purchase Orders</title> ${imageStyles}</head><body>`);
    //         printWindow.document.write('<h1>Purchase Orders</h1>');
    //         printWindow.document.write('<ul>');

    //         newPOs.forEach(pos => {
    //             const id = pos.id;
    //             const image = pos.image;
    //             printWindow.document.write(`<h3>Purchase Order ID: ${pos.id}</h3>`);
    //             printWindow.document.write(`<div>Date Created: ${pos.createdAt}</div>`);
    //             printWindow.document.write(`<div>Created By: ${user[pos.userId]?.employeeID}</div>`);
    //             printWindow.document.write(`<table class="poTable"><thead><tr>`);
    //             printWindow.document.write(`<th class="itemCodeCol">Item Code</th><th class="descriptionCol">Description</th><th class="quantityCol">Qty</th></tr></thead><tbody>`);

    //             const printPOItems = poItems.filter(positem => positem.purchase_orderId === id)
    //             printPOItems.forEach(poitem => {
    //                 printWindow.document.write(`<tr>`);
    //                 printWindow.document.write(`<td>${item[poitem.itemId].code}</td>`)
    //                 printWindow.document.write(`<td>${item[poitem.itemId].description}</td>`)
    //                 printWindow.document.write(`<td>${poitem.quantity}</td>`)
    //                 printWindow.document.write(`</tr>`);
    //             })

    //             printWindow.document.write(`</tbody></table>`);
    //             printWindow.document.write(`<div>Signed: <img class="sigImg" src="${pos.image}" alt="signature" /></div>`)
    //             printWindow.document.write('<div class="line">==========================</div>');

    //         });


    //         printWindow.document.write('</ul>');
    //         printWindow.document.write('</body></html>');
    //         printWindow.document.close();

    //         printWindow.onload = () => {
    //             printWindow.print();
    //         };

    //     } else {
    //         alert('Popup blocked. Please enable popups to print the items.');
    //     }

    // }

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
             <button className='searchClear' onClick={()=>searchAction()}><i className="fa-solid fa-magnifying-glass"></i>{" "}search</button>
             <button className='searchClear' onClick={()=>clearSearch()}><i className="fa-solid fa-broom"></i>{" "}clear</button>
             {/* <button className='print' onClick={()=>handlePrint()}><i className="fa-solid fa-print"></i>{" "}Print</button> */}
        </div>
        <div id='filter'>
            Filter by: <button id={chooseFilterCode} className='cdtButton' onClick={()=> {setFilter('code'); setChooseCode(true); setChooseDesc(false); setChooseType(false)}}>Code</button>
            <button id={chooseFilterDesc} className='cdtButton' onClick={()=> {setFilter('description'); setChooseCode(false); setChooseDesc(true); setChooseType(false)}}>Description</button>
            <button id={chooseFilterType} className='cdtButton' onClick={()=> {setFilter('type'); setChooseCode(false); setChooseDesc(false); setChooseType(true)}}>Type</button>

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
