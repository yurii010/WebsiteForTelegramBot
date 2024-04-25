import { useEffect, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const ProductList = () => {
    const { tg, products, onSendData, onAdd } = useTelegram();

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    return (
        <div className='list'>
            {products.map(product => (
                <ProductItem
                    product={product}
                    onAdd={onAdd}
                    className='item'
                />
            ))}
        </div>
    );
};
export default ProductList;