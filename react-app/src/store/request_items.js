//------------------------CONSTANTS---------------------------
const GET_REQUEST_ITEMS = 'request_items/GET_REQUEST_ITEMS'
// const CREATE_REQ_ITEM = 'request_items/CREATE_REQ_ITEM'

//------------------------------DISPATCH FXNS-----------------------------
const get_request_items = (item) => ({
    type: GET_REQUEST_ITEMS,
    payload: item
})

// const create_request_item = (reqitem) => ({
//     type: CREATE_REQ_ITEM,
//     payload: reqitem
// })

//-------------------------------THUNKS-----------------------------------------
export const getRequestItems = (requestId) => async(dispatch) => {
    const response = await fetch(`/api/request_items/${requestId}`, {
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(get_request_items(data))
    }
}

export const createRequestItem = (itemId, {quantity}) => async(dispatch) => {

    const response = await fetch(`/api/request_items/${itemId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity})
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        } else {
            return
        }
    } else {
        return ["There was an error making your Request!"]
    }
}

//------------------------------REDUCER FXN------------------------------------

const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_REQUEST_ITEMS:
            action.payload.request_items.forEach(request_item => newState[request_item.id] = request_item);
            return newState;
        // case CREATE_REQ_ITEM:
        //     newState[action.payload] = action.payload;
        //     return newState;
        default:
            return state
    }
}
