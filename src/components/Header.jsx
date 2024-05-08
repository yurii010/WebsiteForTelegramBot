import '../App.css';
import Button from './Button';
import { useTelegram } from '../hooks/useTelegram';
import { Link } from 'react-router-dom';

const Header = () => {
    const { onClose, user, userLang } = useTelegram();

    return (
        <div className='header'>
            <div className='header-buttons'>
                <Link className='link' to={`/`}>
                    <Button className="close-button">{userLang == 'uk' ? 'Магазин' : 'Shop'}</Button>
                </Link>
                <Link className='link' to={`/auth/login`}>
                    <Button className="close-button">{userLang == 'uk' ? 'Профіль' : 'Profile'}</Button>
                </Link>
                <Button className="close-button" onClick={onClose}>{userLang == 'uk' ? 'Закрити' : 'Close'}</Button>
            </div>
            <span className='username'>
                {userLang == 'uk' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}<br />
            </span>
        </div>
    );
};
export default Header;