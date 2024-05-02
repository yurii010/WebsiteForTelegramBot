import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {

    /* State */

    const [addedItems, setAddedItems] = useState([]);
    const [userLang, setUserLang] = useState();
    const userId = 859868539;

    const onSendId = useCallback(async () => {
        const data = { userId };
        try {
            const response = await axios.post('https://82d7-217-196-161-98.ngrok-free.app/getUserLanguage', data);
            setUserLang(response);
        } catch (error) {
            console.error("Error fetching user language", error);
        }
    }, [userId]);

    useEffect(() => {
        onSendId()
    }, [onSendId])

    console.log(userLang);

    /* Properties */

    const tg = window.Telegram.WebApp;
    const queryId = tg.initDataUnsafe?.query_id;
    const user = tg.initDataUnsafe?.user;
    //const userId = user?.id;
    const userLanguage = user?.language_code;

    const products = [
        { id: '1', title: (userLanguage == 'uk' ? 'Банани' : 'Banana'), price: 100, description: (userLanguage == 'uk' ? 'Добрі' : 'Good'), image: 'https://freepngimg.com/thumb/banana/13-banana-png-image-bananas-picture-download.png' },
        { id: '2', title: (userLanguage == 'uk' ? 'Яблуко' : 'Apple'), price: 200, description: (userLanguage == 'uk' ? 'Хороші' : 'Well'), image: 'https://freepngimg.com/thumb/apple/9-apple-png-image.png' },
        { id: '3', title: (userLanguage == 'uk' ? 'Ківі' : 'Kiwi'), price: 300, description: (userLanguage == 'uk' ? 'Приголовшливі' : 'Awesome'), image: 'https://freepngimg.com/thumb/kiwi/3-kiwi-png-image-fruit-kiwi-png-pictures-download.png' },
        { id: '4', title: (userLanguage == 'uk' ? 'Малина' : 'Raspberry'), price: 400, description: (userLanguage == 'uk' ? 'Дивовижна' : 'Amazing'), image: 'https://freepngimg.com/thumb/raspberry/3-rraspberry-png-image.png' },
        { id: '5', title: (userLanguage == 'uk' ? 'Чорниця' : 'Blackberry'), price: 500, description: (userLanguage == 'uk' ? 'Прекрасний' : 'Pretty'), image: 'https://freepngimg.com/thumb/blackberry/6-2-blackberry-fruit-free-png-image.png' },
        { id: '6', title: (userLanguage == 'uk' ? 'Кавун' : 'Watermelon'), price: 600, description: (userLanguage == 'uk' ? 'Солодкий' : 'Sweet'), image: 'https://freepngimg.com/thumb/watermelon/4-watermelon-png-image.png' },
        { id: '7', title: (userLanguage == 'uk' ? 'Апельсин' : 'Orange'), price: 700, description: (userLanguage == 'uk' ? 'Крутий' : 'Cool'), image: 'https://freepngimg.com/thumb/orange/12-orange-png-image-download.png' },
        { id: '8', title: (userLanguage == 'uk' ? 'Персик' : 'Peach'), price: 800, description: (userLanguage == 'uk' ? 'Файні' : 'Nice'), image: 'https://freepngimg.com/thumb/peach/4-peach-png-image.png' },
        { id: '9', title: (userLanguage == 'uk' ? 'Вишня' : 'Cherry'), price: 900, description: (userLanguage == 'uk' ? 'Чудові' : 'Great'), image: 'https://freepngimg.com/thumb/cherry/1-red-cherry-png-image-download.png' },
        { id: '10', title: (userLanguage == 'uk' ? 'Мандарин' : 'Tangerin'), price: 1000, description: (userLanguage == 'uk' ? 'Добрі' : 'Good'), image: 'https://freepngimg.com/thumb/orange/5-orange-png-image-download.png' },
    ];

    /* Methods */

    const onClose = () => {
        tg.close();
    }

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return (acc += item.price);
        }, 0);
    };

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find((item) => item.id === product.id);
        let newItems = [];
        if (alreadyAdded) {
            newItems = addedItems.filter((item) => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);
        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `${(userLanguage == 'uk' ? 'Купити' : 'Buy')} ${getTotalPrice(newItems)}`,
            });
        }
    };

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        // need change localhost and port /web-data
        fetch('https://82d7-217-196-161-98.ngrok-free.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    // const result = await response.json();
    // console.log(result)

    // useEffect(() => {
    //     return () => {
    //         onSendId();
    //     }
    // }, [onSendId, userLang]);

    /* Return */

    const contextValue = {
        tg,
        products,
        addedItems,
        user,
        userLanguage,
        userLang,
        onSendId,
        onSendData,
        setAddedItems,
        getTotalPrice,
        onClose,
        onAdd,
    };

    return (
        <TelegramContext.Provider value={contextValue}>
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => {
    return useContext(TelegramContext);
};
