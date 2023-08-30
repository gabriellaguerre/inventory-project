const GET_POS = 'pos/GET_POS'



//------------------------------DISPATCH VARIABLES-----------------------------
const get_pos = (pos) => ({
    type: GET_POS,
    payload: pos
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


//------------------------------REDUCER FXN------------------------------------
const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_POS:
            action.payload.purchase_orders.forEach(pos => newState[pos.id] = pos);
            return newState;
        default:
            return state
    }
}
