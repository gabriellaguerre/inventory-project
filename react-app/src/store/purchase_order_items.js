//------------------------CONSTANTS---------------------------
const GET_PURCHASE_ORDER_ITEMS = 'request_items/GET_PURCHASE_ORDER_ITEMS'
const CREATE_PO_ITEM = 'request_items/CREATE_PO_ITEM'

//------------------------------DISPATCH FXNS-----------------------------
const get_po_items = (item) => ({
    type: GET_PURCHASE_ORDER_ITEMS,
    payload: item
})

const create_po_item = (poitem) => ({
    type: CREATE_PO_ITEM,
    payload: poitem
})

//-------------------------------THUNKS-----------------------------------------
export const getPOItems = (posId) => async(dispatch) => {
    const response = await fetch(`/api/purchase_order_items/${posId}`, {
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(get_po_items(data))
    }
}

export const createPOItem = (itemId, {quantity}) => async(dispatch) => {

    const response = await fetch(`/api/purchase_order_items/${itemId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity})
    })
    if (response.ok) {
        // const data = await response.json()
        // dispatch(create_request_item(data))
        return
    }
}

//------------------------------REDUCER FXN------------------------------------

const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_PURCHASE_ORDER_ITEMS:
            action.payload.purchase_order_items.forEach(purchase_order_item => newState[purchase_order_item.id] = purchase_order_item);
            return newState;
        // case CREATE_REQ_ITEM:
        //     newState[action.payload] = action.payload;
        //     return newState;
        default:
            return state
    }
}
