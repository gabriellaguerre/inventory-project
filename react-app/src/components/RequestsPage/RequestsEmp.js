import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as RequestsActions from '../../store/requests';
import * as UsersActions from '../../store/user';
import ItemListReq from '../ItemsPage/ItemListReq';
import NewRequestForm from '../NewRequestForm/NewRequestForm.js';
import NewPOForm from '../NewPOForm/NewPOForm.js';
import OpenModalButton from '../OpenModalButton';
import './RequestsEmp.css'



function RequestsEmp() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        dispatch(RequestsActions.resetState())
        dispatch(RequestsActions.getRequestsByPage(page))
        dispatch(UsersActions.get_Users())
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

    const previous = (page) => {
        if (page>0) dispatch(RequestsActions.resetState())
    }


    return (
        <>
            <div id='pagination'>
            <button id='previous' onClick={()=> {if (page>0) setPage(page-1); previous(page)}}>Previous</button>
            <span id='page'>Page {page+1} of {' '}{requests[requests.length-1]}</span>
            <button id='next' onClick={()=> {setPage(page+1);  dispatch(RequestsActions.resetState())}} disabled={disable}>Next</button>
            </div>
            <table className='request-table-employee'>
                <thead>
                    <tr>
                        <td className='header' style={{ textAlign: 'center' }} colSpan='11'><button id='requestForm'><OpenModalButton
                            buttonText=<div className='requestForm'><i className="fa-solid fa-circle-plus"></i> New Request</div>
                            modalComponent={<NewRequestForm />} /></button>
                            <button id='poForm'><OpenModalButton
                                buttonText=<span><i className="fa-solid fa-circle-plus"></i> New PO</span>
                                modalComponent={<NewPOForm />} /></button>
                            <button className='POs'>
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
                            ) : (
                                <td><div id='applied'>applied</div></td>
                            )}
                            <td>{request.id}</td>
                            <td>{request.createdAt}</td>
                            <td>{user[request.userId]?.employeeID}</td>
                            <td>
                                <div className='reqView'>
                                <OpenModalButton
                                    buttonText=<div><i className="fa-regular fa-eye"></i></div>
                                    modalComponent={<ItemListReq requestId={request.id} />} /></div></td>
                        </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default RequestsEmp;
