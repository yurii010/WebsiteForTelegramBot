import '../App.css';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';

const ProductItem = ({ product, onAdd }) => {
    const { userLang } = useTelegram();
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
                {/* <div className='description' > {product.description}</div >
                <div className='price' >
                    <span>{userLang == 'uk' ? 'Ціна: ' : 'Price: '} <b>{product.price}</b></span>
                </div> */}
            </div>
            <Link className='link' to={`/about/${product.id}`}>
                <Button className='product-buttons'>
                    {userLang == 'uk' ? 'Більше про' : 'More about'}
                </Button>
            </Link>
            <Button className='product-buttons' onClick={onAddHandler}>
                {userLang == 'uk' ? 'Додати' : 'Add'}
            </Button>
        </div >
    );
};
export default ProductItem;