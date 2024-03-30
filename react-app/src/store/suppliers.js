const GET_SUPPLIERS = 'suppliers/GET_SUPPLIERS'
const GET_SUPPLIERS_BY_PAGE = 'suppliers/GET_SUPPLIERS_BY_PAGE'
const GET_SUPPLIERLIST = 'suppliers/GET_SUPPLIERLIST'
const RESET_STATE = 'suppliers/RESET_STATE'
const CREATE_SUPPLIER = 'suppliers/CREATE_SUPPLIER'
const EDIT_SUPPLIER = 'suppliers/EDIT_SUPPLIER'
const SEARCH_SUPPLIERS = 'suppliers/SEARCH_SUPPLIERS'
const DELETE_SUPPLIER = 'suppliers/DELETE_SUPPLIER'

//------------------------------DISPATCH VARIABLES-----------------------------
const get_suppliers_by_page = (suppliers) => ({
    type: GET_SUPPLIERS_BY_PAGE,
    payload: suppliers
})

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

const edit_supplier = (supplier) => ({
    type: EDIT_SUPPLIER,
    payload: supplier
})

const search_suppliers = (suppliers) => ({
    type: SEARCH_SUPPLIERS,
    payload: suppliers
})

const delete_supplier = (supplierId) => ({
    type: DELETE_SUPPLIER,
    payload: supplierId
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
export const getSuppliersByPage = (page) => async (dispatch) => {
    const response = await fetch(`/api/suppliers/${page}`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(get_suppliers_by_page(data))
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
        body: JSON.stringify(supplier)
    })

    if (response.ok) {
        const data = await response.json()
        if(data.errors) {
            return data.errors
        } else {
            dispatch(create_supplier(data))
        }
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

export const editSupplier = (supplier, supplierId) => async(dispatch) => {
    const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(supplier)
    })

    if (response.ok) {
        const data = await response.json()
        if(data.errors) {
            return data.errors
        } else {
        dispatch(edit_supplier(data))
    }
 }
}

export const searchSuppliers = ({query, filter}) => async(dispatch) => {
    console.log(query, filter, "QUERY AND FILTER")
    const response = await fetch(`api/suppliers/search?query=${query}&filter=${filter}`, {
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(search_suppliers(data))
    }
}

export const deleteSupplier = (supplierId) => async (dispatch) => {
    const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        dispatch(delete_supplier(supplierId))
    }
}


//------------------------------REDUCER FXN------------------------------------
const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = { ...state }
    switch(action.type) {
        case GET_SUPPLIERS_BY_PAGE:
            action.payload.suppliers.forEach(supplier => newState[supplier.id] = supplier);
            newState['total_pages'] = action.payload.total_pages
            return newState;
        case GET_SUPPLIERS:
            action.payload.suppliers.forEach(supplier => newState[supplier.id] = supplier);
            return newState;
        case GET_SUPPLIERLIST:
            newState[action.payload.suppliers] = action.payload.suppliers
            return newState;
        case CREATE_SUPPLIER:
            newState[action.payload.id] = action.payload;
            return newState
        case EDIT_SUPPLIER:
            newState[action.payload.id] = action.payload;
            return newState;
        case SEARCH_SUPPLIERS:
            action.payload.suppliers.forEach(supplier => newState[supplier.id] = supplier);
            newState['total_pages'] = action.payload.total_pages
            return newState;
        case RESET_STATE:
            return initialState;
        case DELETE_SUPPLIER:
            delete newState[action.payload]
            return newState;
        default:
            return state
    }

}
