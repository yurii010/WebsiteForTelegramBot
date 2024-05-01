import '../App.css';

import Button from './Button';
import { useTelegram } from '../hooks/useTelegram';
import { useEffect } from 'react';

const Header = () => {
    const { onClose, user, userLanguage, userLang, onSendId } = useTelegram();

    useEffect(() => {
        onSendId
    }, [onSendId])

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLanguage == 'uk' ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLanguage == 'uk' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}<br />
                Test: {userLang}
            </span>
        </div>
    );
};
export default Header;