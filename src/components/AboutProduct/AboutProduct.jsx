import './AboutProduct.css';
import '../ProductItem/ProductItem.css';
import Button from '../Button/Button';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';

const AboutProduct = () => {
    const { tg, products, onSendData, onAdd } = useTelegram();

    const params = useParams();

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAddHandler = () => {
        onAdd(products[params.id - 1]);
    }
    return (
        <div className={`product`}>
            <div className='img' />
            <div className='title' >{products[params.id - 1].title}</div>
            <div className='description' >{products[params.id - 1].description}</div >
            <div className='price' >
                <span>Price: <b>{products[params.id - 1].price}</b></span>
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