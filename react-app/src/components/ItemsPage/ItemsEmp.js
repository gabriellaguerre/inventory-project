import React from 'react';
import {useSelector} from 'react-redux';
import * as ItemsActions from '../../store/items'

function ItemsEmp() {

    const items = useSelector(state => state.items)
    console.log(items)

    return (
        <h2>Items Emp Page</h2>
    )
}

export default ItemsEmp;
