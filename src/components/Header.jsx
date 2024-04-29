import '../App.css';

import Button from './Button';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const { onClose, user } = useTelegram();

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>Close</Button>
            <span className='username'>
                ID: {user?.id} <br />
                Username: {user?.username} <br />
                Name: {user?.first_name} <br />
                Language: {user?.language_code}
            </span>
        </div>
    );
};
export default Header;