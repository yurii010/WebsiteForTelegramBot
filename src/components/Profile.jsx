import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import axios from "axios";

const Profile = () => {
    const { userLang, link } = useTelegram();
    const [username, setUsername] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            return
        } else {
            navigate("/auth/login");
        }
    }, [token])

    const onSendUsername = async () => {
        const email = localStorage.getItem('email');
        try {
            const response = await axios.get(`${link}/users`, email);
            const { name } = response.data;
            setUsername(name);
        } catch (error) {
            console.error("Error fetching username", error);
        }
    };

    useEffect(() => {
        onSendUsername()
    }, [onSendUsername])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/auth/login");
        window.location.reload();
    }
    return (
        <div className={''}>
            <p>Your account username: {username}</p>
            <button onClick={handleLogout} className={'login-button'}>
                {userLang == 'uk' ? 'Вийти' : 'Sing out'}
            </button>
        </div>
    );
};

export default Profile;