

//-------------------------------THUNKS-----------------------------------------
export const saveSignature = (image) => async (dispatch) => {
    console.log(image, "HHHHHHHHHHHHHHHHHHH")
    const response = await fetch ('/api/signatures', {
        method: "POST",
        headers: {'Content-Type': 'multipart/form-data'},
        body: image
    })
    if (response.ok) {
        const data = await response.json()
        if(data.errors) {
            return data.errors
        } else {
            return
        }
    }
}

//------------------------------REDUCER FXN------------------------------------
const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        default:
            return newState;
        }
}
