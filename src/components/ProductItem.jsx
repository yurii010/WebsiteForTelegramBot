import '../App.css';

import Button from './Button';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, onAdd }) => {

    const onAddHandler = () => {
        onAdd(product);
    }
    return (
        <div className='product'>
            <div className='product-image-div'>
                <img className='product-image' src={product.image} alt={product.title} />
            </div>
            <div className='product-description'>
                <div className='title' >{product.title}</div>
                <div className='description' > {product.description}</div >
                <div className='price' >
                    <span>Price: <b>{product.price}</b></span>
                </div>
            </div>
            <Link className='link' to={`/about/${product.id}`}>
                <Button className='product-buttons'>
                    More about
                </Button>
            </Link>
            <Button className='product-buttons' onClick={onAddHandler}>
                Add
            </Button>
        </div >
    );
};
export default ProductItem;