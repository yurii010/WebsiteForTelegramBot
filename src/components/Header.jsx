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
                {user?.firstname}
                {user?.language_code}
                {user?.id}
            </span>
        </div>
    );
};
export default Header;