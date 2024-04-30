import '../App.css';

import Button from './Button';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userLanguage, users } = useTelegram();

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>{userLanguage == 'uk' || 'ru' ? 'Закрити' : 'Close'}</Button>
            <span className='username'>
                {userLanguage == 'uk' || 'ru' ? 'Ваш нікнейм: ' : 'Your username: '}{user?.username}
                {/* {users.language_code} */}
            </span>
        </div>
    );
};
export default Header;