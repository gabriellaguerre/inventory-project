import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import * as ItemsActions from '../../store/items';
import * as RequestsActions from '../../store/requests'
import * as RequestItemsActions from '../../store/request_items'
import './NewRequestForm.css'

function NewRequestForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const canvasRef = useRef(null);
    const formData = new FormData();

    useEffect(() => {
        dispatch(ItemsActions.resetState())
        dispatch(ItemsActions.getAllItems())
    }, [dispatch])

    const [itemId1, setItemCode1] = useState('')
    const [itemId2, setItemCode2] = useState('')
    const [itemId3, setItemCode3] = useState('')
    const [quantity1, setQuantity1] = useState('')
    const [quantity2, setQuantity2] = useState('')
    const [quantity3, setQuantity3] = useState('')
    const [errors, setErrors] = useState([])
    const [isDrawing, setIsDrawing] = useState(false);
    const [signed, setSigned] = useState(false);
    const [disabled, setDisabled] = useState(false)

    const itemList = useSelector(state => Object.values(state.items))
    const thisItem1 = useSelector(state => state.items[itemId1])
    const thisItem2 = useSelector(state => state.items[itemId2])
    const thisItem3 = useSelector(state => state.items[itemId3])

    let updatedItemList = []

    for (let i = 0; i < itemList.length - 1; i++) {
        let item = itemList[i]
        updatedItemList.push(item)
    }

    useEffect(() => {
        let errors = [];
        let isDisabled = false;

        if (itemId1.length > 0 && quantity1.length > 0) {
            if (!+quantity1) {
                errors.push('Enter a valid Quantity');
                isDisabled = true;
            } else if (thisItem1?.quantity < +quantity1) {
                errors.push(`Quantity requested for ${thisItem1?.code} is not available in inventory`);
                isDisabled = true;
            }
        }

        if (itemId2.length > 0 && quantity2.length > 0) {
            if (!+quantity2) {
                errors.push('Enter a valid Quantity');
                isDisabled = true;
            } else if (thisItem2?.quantity < +quantity2) {
                errors.push(`Quantity requested for ${thisItem2?.code} is not available in inventory`);
                isDisabled = true;
            }
        }

        if (itemId3.length > 0 && quantity3.length > 0) {
            if (!+quantity3) {
                errors.push('Enter a valid Quantity');
                isDisabled = true;
            } else if (thisItem3?.quantity < +quantity3) {
                errors.push(`Quantity requested for ${thisItem3?.code} is not available in inventory`);
                isDisabled = true;
            }
        }

        if (itemId1.length > 0 && itemId2.length > 0 && itemId1 === itemId2) {
            errors.push('*2 Items have the same Item Code');
            isDisabled = true;
        }

        if (itemId1.length > 0 && itemId3.length > 0 && (itemId1 === itemId3 || itemId2 === itemId3)) {
            errors.push('*2 Items have the same Item Code');
            isDisabled = true;
        }

        if (itemId1.length > 0 && itemId2.length > 0 && itemId3.length > 0) {
            isDisabled = false;
        }

        setErrors(errors);
        setDisabled(isDisabled);

    }, [itemId1, itemId2, itemId3, quantity1, quantity2, quantity3, thisItem1, thisItem2, thisItem3, signed]);


    const createRequestOrder = async () => {

        const reqResponse = await dispatch(RequestsActions.createRequest(formData));

        if (reqResponse) {

            const itemsToCreate = [
                { itemId: itemId1, quantity: quantity1 },
                { itemId: itemId2, quantity: quantity2 },
                { itemId: itemId3, quantity: quantity3 },
            ];

            for (const { itemId, quantity } of itemsToCreate) {

                if (itemId && +quantity) {
                    await dispatch(RequestItemsActions.createRequestItem(itemId, { quantity }));
                }
            }
            await dispatch(RequestsActions.resetState())
            // .then(dispatch(RequestsActions.getRequestsByPage(0)))
            .then(history.push('/requests'))

        } else {
            setErrors(['Error processing your request'])
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (signed) {
            const canvas = canvasRef.current;
            let signatureDataURL = canvas.toDataURL('image/png');
            const parts = signatureDataURL.split(",");
            const base64Content = parts[1];
            formData.append('image', base64Content)

            await createRequestOrder()

                .then(closeModal())

        }
    }

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';

        const x = e.nativeEvent.offsetX || e.nativeEvent.layerX;
        const y = e.nativeEvent.offsetY || e.nativeEvent.layerY;

        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();

        setIsDrawing(true);
        setSigned(true)
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const x = e.nativeEvent.offsetX || e.nativeEvent.layerX;
        const y = e.nativeEvent.offsetY || e.nativeEvent.layerY;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas by drawing a clear rectangle over it
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSigned(false)
    };

    const handleCancel = async () => {
        await dispatch(ItemsActions.resetState())
            .then(dispatch(ItemsActions.getItemsByPage(0)))
            .then(closeModal())
    }

    return (
        <>
            <div className='reqformmodalContainer'>
                <div className='titleNewRequest'>Create New Request</div>
                <div className='error-request-form'>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx} style={{ color: 'red' }}>{error}</li>
                        ))}
                    </ul></div>
                <form encType="multipart/form-data" onSubmit={onSubmit}>
                    <table className='new-request-form'>
                        <thead>
                            <tr className='labels'>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Qty Needed</th>
                                <th> In Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select
                                        value={itemId1}
                                        onChange={e => { setItemCode1(e.target.value) }}>
                                        <option value='' disabled>(Select Item)</option>
                                        {updatedItemList.map(item =>
                                            <><option key={item.id} value={item.id}>{item.code}</option></>)}
                                    </select>
                                </td>
                                <td>{thisItem1?.description}</td>
                                <td id='input'>
                                    <input className='quantities'
                                        value={quantity1}
                                        placeholder='qty needed'
                                        onChange={e => setQuantity1(e.target.value)}>
                                    </input>
                                </td>
                                <td>{thisItem1?.quantity}</td>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        value={itemId2}
                                        onChange={e => { setItemCode2(e.target.value) }}>
                                        <option value='' disabled>(Select Item)</option>
                                        {updatedItemList.map(item =>
                                            <><option key={item.id} value={item.id}>{item.code}</option></>)}
                                    </select>
                                </td>
                                <td>{thisItem2?.description}</td>
                                <td id='input'>
                                    <input className='quantities'
                                        value={quantity2}
                                        placeholder='qty needed'
                                        onChange={e => setQuantity2(e.target.value)}>
                                    </input>
                                </td>
                                <td>{thisItem2?.quantity}</td>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        value={itemId3}
                                        onChange={e => { setItemCode3(e.target.value) }}>
                                        <option value='' disabled>(Select Item)</option>
                                        {updatedItemList.map(item =>
                                            <><option key={item.id} value={item.id} >{item.code}</option></>)}
                                    </select>
                                </td>
                                <td>{thisItem3?.description}</td>
                                <td id='input'>
                                    <input className='quantities'
                                        value={quantity3}
                                        placeholder='qty needed'
                                        onChange={e => setQuantity3(e.target.value)}>
                                    </input>
                                </td>
                                <td>{thisItem3?.quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <div id='drawSigTitle'>Draw your signature:</div>
                        {signed ? (<></>) : (<div id='sigRequired'>** Signature is required **</div>)}
                        <button id='ClearSig' onClick={clearCanvas}>Clear Signature</button>

                        <canvas id='file'
                            ref={canvasRef}
                            width={700}
                            height={100}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={endDrawing}
                            // type='file'
                            accept='image/*'
                        />
                    </div>
                    <div className='newSubmit'>
                        <button id='CreateReq' type='submit' disabled={disabled}>Submit</button>
                        <button id='CancelReq' onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewRequestForm;
