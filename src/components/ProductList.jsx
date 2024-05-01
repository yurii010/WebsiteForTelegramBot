import '../App.css';

import { useEffect, useCallback } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import ProductItem from './ProductItem';

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
                    key={product.id}
                    product={product}
                    onAdd={onAdd}
                />
            ))}
        </div>
    );
};
export default ProductList;