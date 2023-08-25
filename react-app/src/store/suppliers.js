const GET_SUPPLIERS = 'suppliers/GET_SUPPLIERS'
const GET_SUPPLIERLIST = 'suppliers/GET_SUPPLIERLIST'
const RESET_STATE = 'suppliers/RESET_STATE'
const CREATE_SUPPLIER = 'suppliers/CREATE_SUPPLIER'
// const CONNECT_SUPPLIER_TO_ITEM = 'suppliers/CONNECT_SUPPLIER_TO_ITEM'

//------------------------------DISPATCH VARIABLES-----------------------------
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

const create_supplier = (supplier) => ({
    type: CREATE_SUPPLIER,
    payload: supplier
})

 //-------------------------------THUNKS-----------------------------------------
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

export const createSupplier = (supplier) => async(dispatch) => {
    const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: supplier
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(create_supplier(data))
    }
}

export const connectSupplierToItem = (itemId, supplierId) => async() => {
    const response = await fetch(`/api/suppliers/${supplierId}/${itemId}`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        return
    }
}

export const connectSupplierToNewItem = (supplierId) => async() => {
    const response = await fetch(`/api/suppliers/${supplierId}/newItem`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        return
    }
}

//------------------------------REDUCER FXN------------------------------------
const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = { ...state }
    switch(action.type) {
        case GET_SUPPLIERS:
            action.payload.suppliers.forEach(supplier => newState[supplier.id] = supplier);
            return newState;
        case GET_SUPPLIERLIST:
            newState[action.payload.suppliers] = action.payload.suppliers
            return newState;
        case CREATE_SUPPLIER:
            newState[action.payload.supplier] = action.payload.supplier
            return newState
        case RESET_STATE:
            return initialState;
        default:
            return state
    }

}
