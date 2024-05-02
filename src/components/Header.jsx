import '../App.css';

import Button from './Button';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLang } = useTelegram();

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLang == 'uk' ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLang == 'uk' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}<br />
            </span>
        </div>
    );
};
export default Header;