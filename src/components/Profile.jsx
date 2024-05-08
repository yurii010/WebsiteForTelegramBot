import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";

const Profile = () => {
    const { userLang } = useTelegram();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            return
        } else {
            navigate("/auth/login");
        }
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/auth/login");
        window.location.reload();
    }
    return (
        <div className={''}>
            Profile<br />
            <button onClick={handleLogout} className={'login-button'}>
                {userLang == 'uk' ? 'Вийти' : 'Sing out'}
            </button>
        </div>
    );
};

export default Profile;