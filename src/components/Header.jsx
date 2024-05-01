import '../App.css';

import Button from './Button';
import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLanguage, userId } = useTelegram();
    //const [userLang, setUserLang] = useState('');
    
    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLanguage == 'uk'  ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLanguage == 'uk'  ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}<br />
                Test: {userLanguage}
            </span>
        </div>
    );
};
export default Header;