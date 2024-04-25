import { useEffect, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const ProductList = () => {
    const { tg, queryId, getTotalPrice, addedItems, onAdd, products } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        // need change localhost and port /web-data
        fetch('https://128b-95-46-0-45.ngrok-free.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    return (
        <div className='list'>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className='item'
                />
            ))}
        </div>
    );
};
export default ProductList;