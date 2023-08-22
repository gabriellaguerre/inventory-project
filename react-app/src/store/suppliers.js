const GET_SUPPLIERS = 'suppliers/GET_SUPPLIERS'
const GET_SUPPLIERLIST = 'suppliers/GET_SUPPLIERLIST'


const getAllSuppliers = (suppliers) => ({
    type: GET_SUPPLIERS,
    payload: suppliers
})

const get_item_suppliers = (suppliers) => ({
    type: GET_SUPPLIERS,
    payload: suppliers
})

export const getSuppliers = () => async (dispatch) => {
    const response = await fetch('/api/suppliers', {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllSuppliers(data))
    }
}

export const getItemSuppliers = ({itemId}) => async(dispatch) => {
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
            action.payload.suppliers.forEach(supplier => newState[supplier.id] = supplier)
            return newState;
        default:
            return state
    }

}
