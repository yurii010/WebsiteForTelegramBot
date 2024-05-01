import '../App.css';

import Button from './Button';
import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLanguage, userId } = useTelegram();
    const [fetchedLanguage, setFetchedLanguage] = useState(null);

    // Use effect to fetch user language from server
    useEffect(() => {
        const fetchUserLanguage = async () => {
            try {
                const response = await fetch('https://39c4-217-196-161-98.ngrok-free.app/user-language', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });
                const data = await response.json();
                setFetchedLanguage(data.languageCode);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserLanguage();
    }, [userId]);

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{fetchedLanguage === 'uk' ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {fetchedLanguage === 'uk' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}<br />
                Test: {fetchedLanguage}
            </span>
        </div>
    );
};

export default Header;
