const GET_ITEMS = 'items/GET_ITEMS'
const GET_SUPPLIERS = 'items/GET_SUPPLIERS'


const get_items = (items) => ({
    type: GET_ITEMS,
    payload: items
})

const get_item_suppliers = (suppliersList) => ({
    type: GET_SUPPLIERS,
    payload: suppliersList
})

export const getAllItems = () => async (dispatch) => {
    const response = await fetch ('/api/items', {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_items(data))
    }
}

export const getItemSuppliers = ({itemId}) => async(dispatch) => {
    const response = await fetch(`/api/items/${itemId}/suppliers`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_item_suppliers(data))
    }
}

const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_ITEMS:
            action.payload.items.forEach(item => newState[item.id] = item);
            return newState;
        case GET_SUPPLIERS:
            console.log(action.payload, 'ZZZZZZZZZZ')
            action.payload.suppliersList.forEach(supplierList => newState[supplierList.id] = supplierList)
            return newState;
        default:
            return state
    }
}
