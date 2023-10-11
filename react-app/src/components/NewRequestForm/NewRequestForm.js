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

  for (let i = 0; i < itemList.length-1; i++){
    let item = itemList[i]
    updatedItemList.push(item)
  }

    useEffect(() => {

        if (itemId1.length === 0 && itemId2.length === 0 && itemId3.length === 0) {
            setDisabled(true)

        } else if (itemId1.length > 0 && quantity1.length === 0 && itemId2.length === 0 && itemId3.length === 0) {
            setDisabled(true)

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length === 0 && itemId3.length === 0 && quantity2.length === 0 && quantity3.length === 0) {
            setDisabled(false)
            setErrors([])

        } else if (itemId1.length > 0 && quantity1.length > 0 && !+quantity1 && itemId2.length === 0 && itemId3.length === 0 && quantity2.length === 0 && quantity3.length === 0) {
            setDisabled(true)
            let errors = ['Enter a valid Quantity']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length === 0 && itemId3.length === 0 && quantity3.length === 0 && itemId1 === itemId2) {
            setDisabled(true)
            let errors = ['*2 Items have the same Item Code']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length === 0 && itemId3.length === 0 && quantity3.length === 0 && itemId1 !== itemId2) {
            setDisabled(true)
            setErrors([])

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length > 0 && quantity2.length > 0 && +quantity2 && itemId1 !== itemId2 && itemId3.length === 0 && quantity3.length === 0) {
            setDisabled(false)
            setErrors([])

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length > 0 && quantity2.length > 0 && !+quantity2 && itemId1 !== itemId2 && itemId3.length === 0 && quantity3.length === 0) {
            setDisabled(true)
            let errors = ['Enter a valid Quantity']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && +quantity1 && itemId2.length > 0 && quantity2.length > 0 && +quantity2 && itemId1 === itemId2 && itemId3.length === 0 && quantity3.length === 0) {
            setDisabled(true)
            let errors = ['*2 Items have the same Item Code']
            setErrors(errors)

        } else if ((itemId1.length > 0 && quantity1.length > 0) && (itemId2.length > 0 && quantity2.length > 0) && (itemId3.length > 0 && quantity3.length === 0)
            && (itemId1 === itemId3 || itemId2 === itemId3)) {
            setDisabled(true)
            let errors = ['*2 Items have the same Item Code']
            setErrors(errors)

        } else if (itemId1.length > 0 && quantity1.length > 0 && itemId2.length > 0 && quantity2.length > 0 && itemId3.length > 0 && quantity3.length === 0) {
            setDisabled(true)
            setErrors([])

        } else if ((!+quantity1 && quantity1.length > 0) || (!+quantity2 && quantity2.length > 0) || (!+quantity3 && quantity3.length > 0)) {
            let errors = ['*Enter a valid Quantity']
            setDisabled(true)
            setErrors(errors)

        } else {
            setDisabled(false)
            setErrors([])
        }

    }, [itemId2, itemId3, itemId1, quantity1, quantity2, quantity3, thisItem1, thisItem2, thisItem3, disabled, signed])

    const createRequestOrder = async () => {

        const reqResponse = await dispatch(RequestsActions.createRequest(formData));

        if(reqResponse) {
            const itemsToCreate = [
                { itemId: itemId1, quantity: quantity1 },
                { itemId: itemId2, quantity: quantity2 },
                { itemId: itemId3, quantity: quantity3 },
              ];

              for (const { itemId, quantity } of itemsToCreate) {
                if (itemId && +quantity) {
                    await dispatch(RequestItemsActions.createRequestItem(itemId,{ quantity }));
                }
            }
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
            .then(history.push('/requests'))
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
                    <form enctype="multipart/form-data" onSubmit={onSubmit}>
                        <table className='new-request-form'>
                            <thead>
                                <tr className='labels'>
                                    <th>Item Code</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
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
                                                <><option value={item.id}>{item.code}</option></>)}
                                        </select>
                                    </td>
                                    <td>{thisItem1?.description}</td>
                                    <td>
                                        <input
                                            value={quantity1}
                                            placeholder='enter item quantity'
                                            onChange={e => setQuantity1(e.target.value)}>
                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select
                                            value={itemId2}
                                            onChange={e => { setItemCode2(e.target.value) }}>
                                            <option value='' disabled>(Select Item)</option>
                                            {updatedItemList.map(item =>
                                                <><option value={item.id}>{item.code}</option></>)}
                                        </select>
                                    </td>
                                    <td>{thisItem2?.description}</td>
                                    <td>
                                        <input
                                            value={quantity2}
                                            placeholder='enter item quantity'
                                            onChange={e => setQuantity2(e.target.value)}>
                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select
                                            value={itemId3}
                                            onChange={e => { setItemCode3(e.target.value) }}>
                                            <option value='' disabled>(Select Item)</option>
                                            {updatedItemList.map(item =>
                                                <><option value={item.id} >{item.code}</option></>)}
                                        </select>
                                    </td>
                                    <td>{thisItem3?.description}</td>
                                    <td>
                                        <input
                                            value={quantity3}
                                            placeholder='enter item quantity'
                                            onChange={e => setQuantity3(e.target.value)}>
                                        </input>
                                    </td>
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
                            <button id='CancelReq' onClick={() => {closeModal(); (dispatch(ItemsActions.resetState()).then(dispatch(ItemsActions.getItemsByPage(0))))}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }

export default NewRequestForm;
