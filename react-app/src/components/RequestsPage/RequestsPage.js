import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as RequestsActions from '../../store/requests';
// import * as ItemsActions from '../../store/items';
import ItemList from '../ItemsPage/ItemList';
import OpenModalButton from '../OpenModalButton';
import './RequestsPage.css'



function RequestsPage() {
const dispatch = useDispatch()

useEffect(()=> {
    dispatch(RequestsActions.getRequests())
}, [dispatch])

const requests = useSelector(state => Object.values(state.requests))


return (
    <>
     <div>
         {requests.map(request =>
         <div key={request.id}>
        <div><span>Request ID: {request.id}
         <OpenModalButton
              buttonText='View request'
              modalComponent={<ItemList requestId={request.id}/>}/>
        </span></div>

         </div>    )}
    </div>
    </>
)
}

export default RequestsPage;
