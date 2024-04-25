import './AboutProduct.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const AboutProduct = ({ product, className, onAdd }) => {
    const onAddHandler = () => {
        onAdd(product);
    }
    return (
        <div className={`product ${className}`}>
            <div className='img' />
            <div className='title' >{product.title}</div>
            <div className='description' > {product.description}</div >
            <div className='price' >
                <span>Price: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Add
            </Button>
            <Button className={'add-btn'}>
                <Link to="/">Go back</Link>
            </Button>
        </div >
    );
};
export default AboutProduct;