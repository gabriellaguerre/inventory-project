// const GET_PURCHASE_ORDERS = 'purchase_orders/GET_PURCHASE_ORDERS'
const CREATE_PURCHASE_ORDER = 'purchase_orders/CREATE_PURCHASE_ORDER'
const EDIT_PURCHASE_ORDER = 'purchase_orders/EDIT_PURCHASE_ORDER'
const RESET_STATE = 'purchase_orders/RESET_STATE'
const GET_POS_BY_PAGE = 'purchase_orders/GET_POS_BY_PAGE'
const GET_PURCHASE_ORDERS = 'purchase_orders/GET_PURCHASE_ORDERS'
const SEARCH_PURCHASE_ORDERS = 'purchase_orders/SEARCH_PURCHASE_ORDERS'


//------------------------------DISPATCH VARIABLES-----------------------------
const get_pos_by_page = (purchase_orders) => ({
    type: GET_POS_BY_PAGE,
    payload: purchase_orders
})

const get_pos = (purchase_orders) => ({
    type: GET_PURCHASE_ORDERS,
    payload: purchase_orders
})

const search_purchase_orders = (purchase_orders) => ({
    type: SEARCH_PURCHASE_ORDERS,
    payload: purchase_orders
})

const edit_purchase_order = (purchase_order) => ({
    type: EDIT_PURCHASE_ORDER,
    payload: purchase_order
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

export const getAllPOS = () => async(dispatch) => {
    const response = await fetch(`/api/purchase_orders/`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_pos(data))
    }
}

export const getPOSByPage = (page) => async(dispatch) => {
    const response = await fetch(`/api/purchase_orders/${page}`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_pos_by_page(data))
    }
}

export const searchPOs = ({query, filter}) => async(dispatch) => {

    const response = await fetch(`api/purchase_orders/search?query=${query}&filter=${filter}`, {
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(search_purchase_orders(data))
    }
}

export const searchPOsByDate = ({startDate, endDate}) => async(dispatch) => {

    const response = await fetch(`api/purchase_orders/search?startDate=${startDate}&endDate=${endDate}`, {
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(search_purchase_orders(data))
    }
}

export const createPurchaseOrder = (formData) =>  async (dispatch) => {
    const response = await fetch(`/api/purchase_orders`, {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: formData
    })

    if (response.ok) {
        // const data = await response.json()
        // dispatch(create_purchase_order(data))
        return true
    } else {
        return false
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
        case GET_POS_BY_PAGE:
            action.payload.purchase_orders.forEach(purchase_order => newState[purchase_order.id] = purchase_order);
            newState['total_pages'] = action.payload.total_pages
            return newState;
        case GET_PURCHASE_ORDERS:
            console.log(action.payload.purchase_orders, 'IN REDUCERRRRRRRRRRR')
            action.payload.purchase_orders.forEach(purchase_order => newState[purchase_order.id] = purchase_order);
            return newState;
        case SEARCH_PURCHASE_ORDERS:
            action.payload.purchase_orders.forEach(purchase_order => newState[purchase_order.id] = purchase_order);
            newState['total_pages'] = action.payload.total_pages
            return newState;
        case CREATE_PURCHASE_ORDER:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_PURCHASE_ORDER:
            newState[action.payload.id] = action.payload;
            return newState;
        case RESET_STATE:
            return initialState;
        default:
            return state
    }
}
