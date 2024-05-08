import axios from "axios";
import { useState } from "react";
import { useTelegram } from "../hooks/useTelegram";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { link, userLang } = useTelegram();
    const [data, setData] = useState({ email: "", username: "", password: "", });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post(link + '/auth/register', data);
            navigate("/auth/login");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.log(error.response.data.message)
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={'container'}>
            <form className={'login-form'} onSubmit={handleSubmit}>
                <p className="login-title">{userLang == 'uk' ? 'Створити профіль' : 'Create Account'}</p>
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
                    type="username"
                    placeholder={userLang == 'uk' ? "Ваше ім'я" : 'Your username'}
                    name="username"
                    onChange={handleChange}
                    value={data.username}
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
                {error && <div className={''}>{error}</div>}
                <button type="submit" className={'login-button'}>
                    {userLang == 'uk' ? 'Зареєструватись' : 'Sing up'}
                </button>
            </form>
            <div className={'login-form mt'}>
                <p className="login-title">{userLang == 'uk' ? 'Вже є профіль?' : 'Account already exists?'}</p>
                <Link to="/auth/login">
                    <button type="button" className={'login-button'}>
                        {userLang == 'uk' ? 'Авторизуватись' : 'Sing in'}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Register;