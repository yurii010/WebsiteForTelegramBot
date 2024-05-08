import axios from "axios";
import { useState } from "react";
import { useTelegram } from "../hooks/useTelegram";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({ username: "", password: "", });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { link } = useTelegram();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post(link+'/auth/register', data);
            navigate("/auth/login");
            console.log(res.message);
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
                <h1>Create Account</h1>
                <input
                    type="username"
                    placeholder="Your username"
                    name="username"
                    onChange={handleChange}
                    value={data.username}
                    required
                    className={''}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className={''}
                />
                {error && <div className={''}>{error}</div>}
                <button type="submit" className={''}>
                    Sing Up
                </button>
            </form>
            <div className={'login-form mt'}>
                <h1>Do not want to create an account?</h1>
                <Link to="/auth/login">
                    <button type="button" className={''}>
                        Sing in
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Register;