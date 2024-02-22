import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as POsActions from '../../store/purchase_orders'
import * as PurchaseOrderItemsActions from '../../store/purchase_order_items'
import './SearchPOByDate.css'

function SearchPOByDate(){
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return(
        <>
        <div className='searchByDateContainer'>
        <div className='titleSearchPOByDate'>Search Purchase Orders By Date </div>
        <div className='startendDate'>
           <span className='startDate'> Start Date </span>
           <span className='endDate'> End Date </span>
        </div>
        <div className='searchInputs'>
        <span className='inputStartDate'><input id='startDate'
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                // onClick={()=> {setHasFilled(true)}}
                /></span>
        <span className='inputEndDate'><input id='endDate'
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                // onClick={()=> {setHasFilled(true)}}
                /></span>
        </div>


        <div className='poSearchButtons'>
            <button className='poSubmitButton'>Submit</button>
            <button className='poCancelButton'onClick={()=>closeModal()}>Cancel</button>
        </div>
        </div>
        </>
    )
}

export default SearchPOByDate;
