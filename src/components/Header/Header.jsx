import './Header.css';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';

const Header = () => {
    const { onClose, user } = useTelegram();

    return (
        <div className='header'>
            <span className='username'>
                {user?.username}
            </span>
            <Button className="close-button" onClick={onClose}>Close</Button>
        </div>
    );
};
export default Header;