import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import * as SuppliersActions from '../../store/suppliers'
import './DeleteSupplier.css';

function DeleteSupplier({supplierId}) {

    const dispatch = useDispatch()
    const {closeModal} = useModal()


    const current_supplier = useSelector(state => (Object.values(state.suppliers)).filter(supplier => supplier.id === supplierId))



    const handleSubmit = async (e) => {
        await dispatch(SuppliersActions.deleteSupplier(supplierId))
        .then(closeModal())
    }


    return (

        <div className="modalDeleteSupplier">
            <div id="delete-title" className="titleDeleteSupplier">Delete this Supplier ?</div>
            <div className='dSupplierName'>Supplier Name: {current_supplier[0].name}</div>
            <div className='dSupplierAddress'>Address: {current_supplier[0].address}</div>

            <div className='deleteSupplierButton'><button  id="yesSupplier" onClick={e => handleSubmit(e)}>Yes</button>
                <span><button id="noSupplier" onClick={closeModal}>No</button></span>
                </div>
        </div>

    )
}

export default DeleteSupplier;
