import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ItemsActions from '../../store/items'


function SuppliersList() {
    const dispatch = useDispatch()

    //  useEffect(() => {
    dispatch(ItemsActions.getItemSuppliers(1))
    // }, [dispatch, itemId])

    const supplierList = useSelector(state => state.supplierList)
    console.log(supplierList, 'PPPPPPPPPPPPPPPPPPPP')

    return (<></>)
}

export default SuppliersList;
