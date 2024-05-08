import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";

const Login = () => {
    const { link } = useTelegram();
    const [data, setData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post(link+'/auth/login', data);
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
                <h1>Login to Your Account</h1>
                <input
                    type="username"
                    placeholder="Your username"
                    name="username"
                    onChange={handleChange}
                    value={data.username}
                    required
                    className={'login-input'}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className={'login-input'}
                />
                {error && <div className={'login-error-text'}>{error}</div>}
                <button type="submit" className={'login-button'}>
                    Sing In
                </button>
            </form>
            <div className={'login-form mt'}>
                <h1>New Here ?</h1>
                <Link to="/auth/register">
                    <button type="button" className={''}>
                        Sing Up
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Login;