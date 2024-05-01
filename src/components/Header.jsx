import '../App.css';

import Button from './Button';
import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLanguage, onSendId } = useTelegram();
    const [userLang, setUserLang] = useState();
    useEffect(() => {
        setUserLang(onSendId); 
      }, [onSendId]);
    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLanguage == 'uk'  ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLanguage == 'uk'  ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}<br />
                Test: {userLang}
            </span>
        </div>
    );
};
export default Header;