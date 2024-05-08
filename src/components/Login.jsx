import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";

const Login = () => {
    const { link, userLang } = useTelegram();
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post(link + '/auth/login', data, { headers: { 'Accept-Language': userLang } });
            localStorage.setItem("token", res.data);
            window.location = "/profile";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={'container'}>
            <form className={'login-form'} onSubmit={handleSubmit}>
                <p className="login-title">{userLang == 'uk' ? 'Авторизація' : 'Login to your account'}</p>
                <input
                    type="email"
                    placeholder={userLang == 'uk' ? 'Ваш поштовий адрес' : 'Your email'}
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className={'input-form login-input'}
                />
                <input
                    type="password"
                    placeholder={userLang == 'uk' ? 'Пароль' : 'Password'}
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className={'input-form login-input'}
                />
                {error && <div className={'login-error-text'}>{error}</div>}
                <button type="submit" className={'login-button'}>
                    {userLang == 'uk' ? 'Авторизуватись' : 'Sing in'}
                </button>
            </form>
            <div className={'login-form mt'}>
                <p className="login-title">{userLang == 'uk' ? 'Вперше тут?' : 'New here?'}</p>
                <Link to="/auth/register">
                    <button type="button" className={'login-button'}>
                        {userLang == 'uk' ? 'Зареєструватись' : 'Sing up'}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Login;