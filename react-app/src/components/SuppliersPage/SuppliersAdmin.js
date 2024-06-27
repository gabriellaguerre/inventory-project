import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as SuppliersActions from '../../store/suppliers'
import EditSupplier from '../EditSupplier/EditSupplier';
import DeleteSupplier from '../DeleteSupplier/DeleteSupplier';
import OpenModalButton from '../OpenModalButton';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import NewItemForm from '../NewItemForm/NewItemForm.js'
import NewSupplierForm from '../NewSupplierForm/NewSupplierForm'
import './SuppliersAdmin.css'



function SuppliersAdmin() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [disable, setDisable] = useState(false)
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [chooseName, setChooseName] = useState(false)
    const [chooseAddress, setChooseAddress] = useState(false)
    const [chooseContact, setChooseContact] = useState(false)
    const [chooseEmail, setChooseEmail] = useState(false)


    useEffect(() => {
        dispatch(SuppliersActions.resetState())
        dispatch(SuppliersActions.getSuppliersByPage(page))
    }, [dispatch, page])

    const suppliers = useSelector(state => Object.values(state.suppliers))

    useEffect(() => {
        if ((page + 2) > suppliers[suppliers.length - 1]) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [page, disable, suppliers])

    let newSuppliers = []
    for (let i = 0; i < (suppliers.length - 1); i++) {
        let supplier = suppliers[i]
        newSuppliers.push(supplier)
    }

    const searchAction = async () => {
        if (query && !filter) {
            alert('Please Choose A Filter.')
        } else if (!query && filter) {
            alert('Please Fill Out The Search Field.')
        } else if (!query && !filter) {
            alert('All The Fields Are Empty.  Please Fill Them Out.')
        } else {
            dispatch(SuppliersActions.resetState())
            dispatch(SuppliersActions.searchSuppliers({ query, filter }))
            setIsSearching(true)
        }
    }

    const clearSearch = async () => {
        setIsSearching(false)
        setFilter('')
        setQuery('')
        setChooseName(false);
        setChooseAddress(false);
        setChooseContact(false);
        setChooseEmail(false);
        dispatch(SuppliersActions.resetState())
        dispatch(SuppliersActions.getSuppliersByPage(page))
    }

    const chooseFilterName = 'search' + (chooseName ? "Yes" : "No")
    const chooseFilterAddress = 'search' + (chooseAddress ? "Yes" : "No")
    const chooseFilterContact = 'search' + (chooseContact ? "Yes" : "No")
    const chooseFilterEmail = 'search' + (chooseEmail ? "Yes" : "No")



    return (
        <>
            {/* <div>Suppliers</div> */}
            {(isSearching) ? (
                <div id='isSearching'>Full List of Search Results</div>
            ) : (
                <div id='pagination'>
                    <button id='previous' onClick={() => { if (page > 0) setPage(page - 1); }}>Previous</button>
                    <span id='page'>Page {page + 1} of {' '}{suppliers[suppliers.length - 1]}</span>
                    <button id='next' onClick={() => { setPage(page + 1); }} disabled={disable}>Next</button>
                </div>
            )}

            <div className='search'>
                <input id='search'
                    value={query}
                    placeholder='Choose a filter and type your search'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='searchClear' onClick={() => searchAction()}><i className="fa-solid fa-magnifying-glass"></i>{" "}Search</button>
                <button className='searchClear' onClick={() => clearSearch()}><i className="fa-solid fa-broom"></i>{" "}Clear</button>

            </div>
            <div id='filter'>
                Filter by: <button id={chooseFilterName} className='naceButton' onClick={() => { setFilter('name'); setChooseName(true); setChooseAddress(false); setChooseContact(false); setChooseEmail(false) }}>Name</button>
                <button id={chooseFilterAddress} className='naceButton' onClick={() => { setFilter('address'); setChooseName(false); setChooseAddress(true); setChooseContact(false); setChooseEmail(false) }}>Address</button>
                <button id={chooseFilterContact} className='naceButton' onClick={() => { setFilter('contact'); setChooseName(false); setChooseAddress(false); setChooseContact(true); setChooseEmail(false) }}>Contact</button>
                <button id={chooseFilterEmail} className='naceButton' onClick={() => { setFilter('email'); setChooseName(false); setChooseAddress(false); setChooseContact(false); setChooseEmail(true) }}>Email</button>

            </div>
            <table className='suppliers-table-admin'>
                <thead>
                    <tr>
                        <td className='header' style={{ textAlign: 'center' }} colSpan='11'><button id='requestForm'><OpenModalButton
                            buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
                            modalComponent={<NewRequestForm />} /></button>
                            <button id='poForm'><OpenModalButton
                                buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                                modalComponent={<NewPOForm />} /></button>
                            <button id='itemForm'><OpenModalButton
                                buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Item</span>
                                modalComponent={<NewItemForm />} /></button>
                            <button id='supplierForm'><OpenModalButton
                                buttonText=<span><i className="fa-solid fa-circle-plus"></i> New Supplier</span>
                                modalComponent={<NewSupplierForm />} /></button>

                            <button className='POs'>
                                <NavLink to='/purchase_orders' id='POs'><i className="fa-regular fa-eye"></i> POs</NavLink></button>
                            <button className='requests'>
                                <NavLink to='/requests' id='requests'><i className="fa-regular fa-eye"></i> Requests</NavLink></button>
                            <button className='items'>
                                <NavLink to='/items' id='items'><i className="fa-regular fa-eye"></i> Items</NavLink></button>
                        </td>
                    </tr>
                    <tr className='labels'>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Cell</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {newSuppliers.map(supplier =>
                        <tr key={supplier.id} className="supplier">
                            <td>{supplier.name}</td>
                            <td id='address'>{supplier.address}</td>
                            <td>{supplier.contact}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.cell}</td>
                            <td><OpenModalButton
                                className='editSupplier'
                                buttonText=<div className='edit'><i className="fa-solid fa-pencil"></i></div>
                                modalComponent={<EditSupplier supplierId={supplier.id} />}
                            /></td>
                            <td><OpenModalButton
                                className='deleteSupplier'
                                buttonText=<div className='delete'><i className="fa-regular fa-trash-can"></i></div>
                                modalComponent={<DeleteSupplier supplierId={supplier.id} />}
                            /></td>
                        </tr>)}
                </tbody>
            </table>

        </>
    )
}

export default SuppliersAdmin;
