import '../App.css';

import { useTelegram } from '../hooks/useTelegram';
import { useEffect, useState, useCallback } from 'react';

const Form = () => {
    const { tg, userLang } = useTelegram();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [subject, setSubject] = useState(userLang == 'uk' ? 'чоловіча' : 'male');

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, city, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: (userLang == 'uk' ? 'Відправити дані!' : 'Send credentials!')
        })
    }, [])

    useEffect(() => {
        if (!country || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, city])

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className='form mt'>
            <h3 className='title-form'>{userLang == 'uk' ? 'Ваші облікові записи' : 'Your credentials'}</h3>
            <input className='input-form' type="text" placeholder={userLang == 'uk' ? 'Ваша країна' : 'Your country'} value={country} onChange={onChangeCountry} />
            <input className='input-form' type="text" placeholder={userLang == 'uk' ? 'Ваше місто' : 'Your city'} value={city} onChange={onChangeCity} />
            <select className='select-form' value={subject} onChange={onChangeSubject}>
                <option value={userLang == 'uk' ? 'чоловіча' : 'male'}>{userLang == 'uk' ? 'Чоловік' : 'Male'}</option>
                <option value={userLang == 'uk' ? 'жіноча' : 'female'}>{userLang == 'uk' ? 'Жінка' : 'Female'}</option>
            </select>
        </div>
    );
};
export default Form;