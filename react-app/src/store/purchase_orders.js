const GET_PURCHASE_ORDERS = 'purchase_orders/GET_PURCHASE_ORDERS'
const CREATE_PURCHASE_ORDER = 'purchase_orders/CREATE_PURCHASE_ORDER'
const EDIT_PURCHASE_ORDER = 'purchase_orders/EDIT_PURCHASE_ORDER'


//------------------------------DISPATCH VARIABLES-----------------------------
const get_pos = (purchase_orders) => ({
    type: GET_PURCHASE_ORDERS,
    payload: purchase_orders
})

const create_purchase_order = (purchase_order) => ({
    type: CREATE_PURCHASE_ORDER,
    payload: purchase_order
})

const edit_purchase_order = (purchase_order) => ({
    type: EDIT_PURCHASE_ORDER,
    payload: purchase_order
})

//-------------------------------THUNKS-----------------------------------------
export const getPOS = () => async(dispatch) => {

    const response = await fetch('/api/purchase_orders', {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_pos(data))
    }
}

export const createPurchaseOrder = () =>  async (dispatch) => {
    const response = await fetch(`/api/purchase_orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(create_purchase_order(data))
    }
}

export const editPO = (posId) => async(dispatch) => {
    const response = await fetch(`/api/purchase_orders/${posId}`, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(edit_purchase_order(data))
    }
}

//------------------------------REDUCER FXN------------------------------------
const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_PURCHASE_ORDERS:
            action.payload.purchase_orders.forEach(purchase_order => newState[purchase_order.id] = purchase_order);
            return newState;
        case CREATE_PURCHASE_ORDER:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_PURCHASE_ORDER:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state
    }
}
