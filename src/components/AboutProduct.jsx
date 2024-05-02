import '../App.css';
import Button from './Button';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';

const AboutProduct = () => {
    const { tg, products, onSendData, onAdd, userLang } = useTelegram();

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

    const product = products[params.id - 1];

    return (
        <div className='product mt'>
            <div className='product-image-div'>
                <img className='product-image' src={product.image} alt={product.title} />
            </div>
            <div className='product-description'>
                <div className='title' >{product.title}</div>
                <div className='description' >{product.description}</div >
                <div className='price' >
                    <span>{userLang == 'uk' ? 'Ціна: ' : 'Price: '}<b>{product.price}</b></span>
                </div>
            </div>
            <Button className='product-buttons' onClick={onAddHandler}>
                {userLang == 'uk' ? 'Додати' : 'Add'}
            </Button>
            <Link className='link' to="/">
                <Button className='product-buttons'>
                    {userLang == 'uk' ? 'Повернутись назад' : 'Go back'}
                </Button>
            </Link>
        </div >
    );
};
export default AboutProduct;