import './AboutProduct.css';
import '../ProductItem/ProductItem.css';
import Button from '../Button/Button';
import { Link, useParams } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';

const AboutProduct = ({ onAdd }) => {
    const { products } = useTelegram();
    const onAddHandler = () => {
        onAdd(products);
    }

    const params = useParams();
    const productStr = JSON.stringify(products);
    const productArray = JSON.parse(productStr);

    return (
        <div className={`product`}>
            <div className='img' />
            <div className='title' >{productArray[params.id - 1].title}</div>
            <div className='description' >{productArray[params.id - 1].description}</div >
            <div className='price' >
                <span>Price: <b>{productArray[params.id - 1].price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Add
            </Button>
            <Link className='back-btn' to="/">
                <Button className={'add-btn'}>
                    Go back
                </Button>
            </Link>
        </div >
    );
};
export default AboutProduct;