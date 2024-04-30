import '../App.css';

import Button from './Button';
import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLanguage } = useTelegram();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://9785-217-196-161-98.ngrok-free.app/users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLanguage == 'uk' || 'ru' ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLanguage == 'uk' || 'ru' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}
                {users.language_code}
            </span>
        </div>
    );
};
export default Header;