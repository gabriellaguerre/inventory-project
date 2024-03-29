import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as POsActions from '../../store/purchase_orders';
import './SearchPOByDate.css'

function SearchPOByDate({onDateSubmit}){
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const searchByDate = () => {

        const startDateObj = new Date(startDate);

        if(startDateObj > Date.now() || endDate < startDate){
            alert('Dates chosen are not valid.  Please try again')
        } else {
             onDateSubmit(startDate, endDate)
             closeModal();
             dispatch(POsActions.resetState())
             dispatch(POsActions.searchPOsByDate({startDate, endDate}))
        }
    }

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

                /></span>
        <span className='inputEndDate'><input id='endDate'
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}

                /></span>
        </div>


        <div className='poSearchButtons'>
            <button className='poSubmitButton' onClick={()=>searchByDate()}>Submit</button>
            <button className='poCancelButton'onClick={()=>closeModal()}>Cancel</button>
        </div>
        </div>
        </>
    )
}

export default SearchPOByDate;
