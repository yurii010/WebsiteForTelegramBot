import '../App.css';

import Button from './Button';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user, userInfo } = useTelegram();

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>Close</Button>
            <span className='username'>
                {user?.username}
                {userInfo.id}
                {userInfo.first_name}
                {userInfo.user_name}
                {userInfo.language_code}
            </span>
        </div>
    );
};
export default Header;