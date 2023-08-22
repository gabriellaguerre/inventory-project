const GET_SUPPLIERS = 'suppliers/GET_SUPPLIERS'
const GET_SUPPLIERLIST = 'suppliers/GET_SUPPLIERLIST'
const RESET_STATE = 'suppliers/RESET_STATE'


// const startingState = () => ({
//     type: RESET_STATE
// })

const getAllSuppliers = (suppliers) => ({
    type: GET_SUPPLIERS,
    payload: suppliers
})

const get_item_suppliers = (suppliers) => ({
    type: GET_SUPPLIERS,
    payload: suppliers
})

const resettingState = () => ({
    type: RESET_STATE
})

export const resetState = () => async (dispatch) => {
    const response = true
    if (response) {
        dispatch(resettingState())
  }
}


export const getSuppliers = () => async (dispatch) => {
    const response = await fetch('/api/suppliers', {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllSuppliers(data))
    }
}

export const getItemSuppliers = (itemId) => async(dispatch) => {
    const response = await fetch(`/api/suppliers/${itemId}`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_item_suppliers(data))
    }
}

const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = { ...state }
    switch(action.type) {
        case GET_SUPPLIERS:
            action.payload.suppliers.forEach(supplier => newState[supplier.id] = supplier);
            return newState;
        case GET_SUPPLIERLIST:
            // console.log(action.payload, 'OOOOOOOOOOOOOOOOO')
            // action.payload.suppliers.forEach(supplier => newState[supplier.id] = supplier)
            newState[action.payload.suppliers] = action.payload.suppliers
            return newState;
        case RESET_STATE:
            return initialState;
        default:
            return state
    }

}
