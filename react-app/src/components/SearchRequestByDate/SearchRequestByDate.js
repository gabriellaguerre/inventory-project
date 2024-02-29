import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as RequestsActions from '../../store/requests';
import './SearchRequestByDate.css'

function SearchRequestByDate({onDateSubmit}){
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const searchByDate = () => {
        onDateSubmit(startDate, endDate)
        closeModal();
        dispatch(RequestsActions.resetState())
        dispatch(RequestsActions.searchRequestsByDate({startDate, endDate}))
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

export default SearchRequestByDate;
