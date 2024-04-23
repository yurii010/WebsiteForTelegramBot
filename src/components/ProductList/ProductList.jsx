import { useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const products = [
    { id: '1', title: 'banana', price: 100, description: 'good' },
    { id: '2', title: 'apple', price: 200, description: 'well' },
    { id: '3', title: 'tomato', price: 300, description: 'awesome' },
    { id: '4', title: 'cabbage', price: 400, description: 'amazing' },
    { id: '5', title: 'onion', price: 500, description: 'pretty' },
    { id: '6', title: 'cucumber', price: 600, description: 'sweet' },
    { id: '7', title: 'orange', price: 700, description: 'cool' },
    { id: '8', title: 'peach', price: 800, description: 'nice' },
    { id: '9', title: 'cherry', price: 900, description: 'bad' },
    { id: '10', title: 'tangerin', price: 1000, description: 'norm' },
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg } = useTelegram();
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItem = [];
        if (alreadyAdded) {
            newItem = addedItems.filter(item => item.id !== product.id);
        } else {
            newItem = [...addedItems, product];
        }

        setAddedItems(newItem);

        if (newItem.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Buy ${getTotalPrice(newItem)}`
            })
        }
    }
    return (
        <div className={'list'}>
            {products.map(item => {
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            })}
        </div>
    );
};
export default ProductList;