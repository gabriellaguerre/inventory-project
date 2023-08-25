const GET_ITEMS = 'items/GET_ITEMS'
const CREATE_ITEM = 'items/CREATE_ITEM'
// const GET_SUPPLIERS = 'items/GET_SUPPLIERS'


const get_items = (items) => ({
    type: GET_ITEMS,
    payload: items
})

const create_item = (item) => ({
    type: CREATE_ITEM,
    payload: item
})

// const get_item_suppliers = (suppliers) => ({
//     type: GET_SUPPLIERS,
//     payload: suppliers
// })

export const getAllItems = () => async (dispatch) => {
    const response = await fetch ('/api/items', {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_items(data))
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
        dispatch(create_item(data))
    }
}

// export const getItemSuppliers = ({itemId}) => async(dispatch) => {
//     const response = await fetch(`/api/items/${itemId}/suppliers`, {
//         headers: {'Content-Type': 'application/json'}
//     })

//     if (response.ok) {
//         const data = await response.json()
//         dispatch(get_item_suppliers(data))
//     }
// }

const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_ITEMS:
            action.payload.items.forEach(item => newState[item.id] = item);
            return newState;
        case CREATE_ITEM:
            newState[action.payload] = action.payload;
            return newState;
        default:
            return state
    }
}
