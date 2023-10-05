//------------------------CONSTANTS---------------------------
const GET_ITEMS = 'items/GET_ITEMS'
const CREATE_ITEM = 'items/CREATE_ITEM'
const EDIT_ITEM = 'items/EDIT_ITEM'
const DELETE_ITEM = 'items/DELETE_ITEM'
const RESET_STATE = 'items/RESET_STATE'
const GET_PO_ITEMS = 'items/GET_PO_ITEMS'



//------------------------------DISPATCH FXNS-----------------------------
const get_items = (items) => ({
    type: GET_ITEMS,
    payload: items
})



const get_po_items = (item) => ({
    type: GET_PO_ITEMS,
    payload: item
})

const create_item = (item) => ({
    type: CREATE_ITEM,
    payload: item
})

const edit_item = (item) => ({
    type: EDIT_ITEM,
    payload: item
})

const reqitem_edit = (item) => ({
    type: EDIT_ITEM,
    payload: item
})

const delete_item = (itemId) => ({
    type: DELETE_ITEM,
    payload: itemId
})

const resettingState = () => ({
    type: RESET_STATE
})


//-------------------------------THUNKS-----------------------------------------

export const resetState = () => async (dispatch) => {
    const response = true
    if (response) {
        dispatch(resettingState())
  }
}

export const getAllItems = (i) => async (dispatch) => {
    const response = await fetch (`/api/items/${i}`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_items(data))
    }
}



export const getPOItems = (posId) => async(dispatch) => {
    const response = await fetch(`/api/items/${posId}`, {
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(get_po_items(data))
    }
}

export const createItem = (item) => async (dispatch) => {

    const response = await fetch ('/api/items', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })
    if (response.ok) {
        const data = await response.json()
        if(data.errors) {
            return data.errors
        } else {
            dispatch(create_item(data))
        }
    }
}

export const editItem = (item, itemId) => async(dispatch) => {
    const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(edit_item(data))
    }
}

export const poeditItem = (itemId, quantity) => async(dispatch) => {
    const response = await fetch(`/api/items/po_edit/${itemId}/${quantity}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
        // body: JSON.stringify(quantity)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(edit_item(data))
    }
}

export const reqitemEdit = (itemId, quantity) => async(dispatch) => {
    const response = await fetch(`/api/items/${itemId}/${quantity}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(reqitem_edit(data))
    }
}

export const deleteItem = (itemId) => async(dispatch) => {
    const response = await fetch(`/api/items/delete/${itemId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(edit_item(data))
    }
}

//------------------------------REDUCER FXN------------------------------------

const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_ITEMS:
            action.payload.items.forEach(item => newState[item.id] = item);
            return newState;
        // case GET_REQUEST_ITEMS:
        //     action.payload.items.forEach(item => newState[item.id] = item);
        //     return newState;
        case GET_PO_ITEMS:
            action.payload.items.forEach(item => newState[item.id] = item);
            return newState;
        case CREATE_ITEM:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_ITEM:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_ITEM:
            delete newState[action.payload]
            return newState;
        case RESET_STATE:
            return initialState;
        default:
            return state
    }
}
