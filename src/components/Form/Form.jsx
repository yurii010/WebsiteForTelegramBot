import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';
import { useEffect, useState } from 'react';

const Form = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [subject, setSubject] = useState('male');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send credentials!'
        })
    }, [])

    useEffect(()=>{
        if(!country || !city){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = () => {
        setCountry(e.target.value);
    }

    const onChangeCity = () => {
        setCity(e.target.value);
    }

    const onChangeSubject = () => {
        setSubject(e.target.value);
    }

    return (
        <div className='form'>
            <h3>Your credentials</h3>
            <input className='input' type="text" placeholder='Your country' value={country} onChange={onChangeCountry} />
            <input className='input' type="text" placeholder='Your city' value={city} onChange={onChangeCity} />
            <select className='select' value={subject} onChange={onChangeSubject}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    );
};
export default Form;