import '../App.css';
import Button from './Button';
import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

// This function makes a POST request to the /user-language endpoint with the userId and returns the language code
const fetchUserLanguage = async (userId) => {
    try {
        const response = await fetch('https://39c4-217-196-161-98.ngrok-free.app/user-language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        if (response.ok) {
            const data = await response.json();
            return data.languageCode; // Return the language code
        }
    } catch (error) {
        console.error('Error fetching user language:', error);
    }
    return 'en'; // Default to English if there's an error
};

const Header = () => {
    const { onClose, user, userId } = useTelegram();
    const [userLanguage, setUserLanguage] = useState('en'); // Default language is English

    useEffect(() => {
        // Fetch the user's language when the component mounts
        const getLanguage = async () => {
            const languageCode = await fetchUserLanguage(userId);
            setUserLanguage(languageCode); // Update the userLanguage state with the fetched value
        };

        getLanguage();
    }, [userId]); // Only re-run if userId changes

    return (
        <div className='header'>
            <Button className="close-button" onClick={onClose}>
                {userLanguage === 'uk' ? 'Закрити' : 'Close'} {/* Translate based on userLanguage */}
            </Button>
            <span className='username'>
                {userLanguage === 'uk' ? 'Ваш нікнейм: ' : 'Your username: '} {user?.username}<br />
                Test: {userLanguage} {/* Display the language code for testing purposes */}
            </span>
        </div>
    );
};

export default Header;
