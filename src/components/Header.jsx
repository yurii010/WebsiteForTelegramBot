import '../App.css';

import Button from './Button';
import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLanguage, userId } = useTelegram();
    const [userLang, setUserLang] = useState('');

    useEffect(() => {
        const fetchUserLanguage = async () => {
            try {
                const response = await fetch(`https://39c4-217-196-161-98.ngrok-free.app/user-language?userId=${userId}`);
                const data = await response.json();
                setUserLang(data.languageCode);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUserLanguage();
    }, [userId]);

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLanguage == 'uk' || 'ru' ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLanguage == 'uk' || 'ru' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}<br />
                Test work?: {userLang}
            </span>
        </div>
    );
};
export default Header;