const GET_ITEMS = 'items/GET_ITEMS'


const get_items = (items) => ({
    type: GET_ITEMS,
    payload: items
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

const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_ITEMS:
            action.payload.items.forEach(item => newState[item.id] = item);
            return newState;
        default:
            return state
    }

}
