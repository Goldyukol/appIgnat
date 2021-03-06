import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from "../../Redux/store";
import { getProductsTC, updateProductTC, buyProductTC, addProductInBasket, deleteProductTC } from "../../Redux/Reducers/ShopReducer";
import "./ShopTable.css"
import ShopDelete from './ShopModals/ShopDelete';

interface IProps {
    p: any
}

const ShopItem = ({ p }: IProps) => {

    const [editMode, setEditMode] = useState(false);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState();
    const [rating, setRating] = useState();


    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsTC())
    }, [])

    // const products = useSelector((store: AppStateType) => store.shop.products);

    const updateProduct = (id: string | undefined, productName: string, price: number) => {
        let updatedProduct = {
            product: {
                id, productName, price
            }
        }
        setEditMode(false)
        dispatch(updateProductTC(updatedProduct))
    }

    const addInBasket = (id: string | undefined, productName: string, price: number) => {
        let product = {
            id: id,
            productName: productName,
            price: price,
            value: false
        }
        dispatch(addProductInBasket(product))
    }

    const deleteMethod = (id: string | undefined) => {
        dispatch(deleteProductTC(id))
    }

    return (
        <>
            <tbody className="table-hover"></tbody>
            {editMode ? <tr key={p.index} >
                <td className="text-left"><input onChange={(e) => { setProductName(e.currentTarget.value) }} /></td>
                <td className="text-left"><input type='number' onChange={(e) => { setPrice(e.currentTarget.value) }} /></td>
                <td className="text-left"><input type='number' onChange={(e) => { setRating(e.currentTarget.value) }} /></td>
                <td className="text-left"><ShopDelete id={p.id} deleteMethod={deleteMethod} />
                    <button onClick={() => { updateProduct(p.id, p.productName, p.price) }}>update</button>
                    <button onClick={() => { updateProduct(p.id, productName, price) }}>save</button>
                </td></tr >
                : <tr key={p.id} >
                    <td className="text-left">{p.productName}</td>
                    <td className="text-left">{p.price}</td>
                    <td className="text-left">{p.rating}</td>
                    <td className="text-left"><ShopDelete id={p.id} deleteMethod={deleteMethod} />
                        <button onClick={() => { updateProduct(p.id, p.productName, p.price) }}>update</button>
                        <button onClick={() => { setEditMode(true) }}>edit</button>
                        <button onClick={() => { dispatch(buyProductTC(p.id)) }}>buy</button>
                        <button onClick={() => { addInBasket(p.id, p.productName, p.price) }}>add in basket</button>
                    </td>
                </tr>}
        </>)
};

export default ShopItem;