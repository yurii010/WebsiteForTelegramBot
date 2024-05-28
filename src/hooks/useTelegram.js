import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {

    /* State */

    const [addedItems, setAddedItems] = useState([]);
    const [userLang, setUserLang] = useState();

    /* Properties */

    const link = "https://2030-95-46-0-45.ngrok-free.app";

    const tg = window.Telegram.WebApp;
    const queryId = tg.initDataUnsafe?.query_id;
    const user = tg.initDataUnsafe?.user;
    const userId = user?.id;
    // const userLanguage = user?.language_code;

    const products = [
        { id: '1', title: (userLang == 'uk' ? 'Банани' : 'Banana'), price: 100, description: (userLang == 'uk' ? 'Добрі' : 'Good'), image: 'https://freepngimg.com/thumb/banana/13-banana-png-image-bananas-picture-download.png' },
        { id: '2', title: (userLang == 'uk' ? 'Яблуко' : 'Apple'), price: 200, description: (userLang == 'uk' ? 'Хороші' : 'Well'), image: 'https://freepngimg.com/thumb/apple/9-apple-png-image.png' },
        { id: '3', title: (userLang == 'uk' ? 'Ківі' : 'Kiwi'), price: 300, description: (userLang == 'uk' ? 'Приголовшливі' : 'Awesome'), image: 'https://freepngimg.com/thumb/kiwi/3-kiwi-png-image-fruit-kiwi-png-pictures-download.png' },
        { id: '4', title: (userLang == 'uk' ? 'Малина' : 'Raspberry'), price: 400, description: (userLang == 'uk' ? 'Дивовижна' : 'Amazing'), image: 'https://freepngimg.com/thumb/raspberry/3-rraspberry-png-image.png' },
        { id: '5', title: (userLang == 'uk' ? 'Чорниця' : 'Blackberry'), price: 500, description: (userLang == 'uk' ? 'Прекрасний' : 'Pretty'), image: 'https://freepngimg.com/thumb/blackberry/6-2-blackberry-fruit-free-png-image.png' },
        { id: '6', title: (userLang == 'uk' ? 'Кавун' : 'Watermelon'), price: 600, description: (userLang == 'uk' ? 'Солодкий' : 'Sweet'), image: 'https://freepngimg.com/thumb/watermelon/4-watermelon-png-image.png' },
        { id: '7', title: (userLang == 'uk' ? 'Апельсин' : 'Orange'), price: 700, description: (userLang == 'uk' ? 'Крутий' : 'Cool'), image: 'https://freepngimg.com/thumb/orange/12-orange-png-image-download.png' },
        { id: '8', title: (userLang == 'uk' ? 'Персик' : 'Peach'), price: 800, description: (userLang == 'uk' ? 'Файні' : 'Nice'), image: 'https://freepngimg.com/thumb/peach/4-peach-png-image.png' },
        { id: '9', title: (userLang == 'uk' ? 'Вишня' : 'Cherry'), price: 900, description: (userLang == 'uk' ? 'Чудові' : 'Great'), image: 'https://freepngimg.com/thumb/cherry/1-red-cherry-png-image-download.png' },
        { id: '10', title: (userLang == 'uk' ? 'Мандарин' : 'Tangerin'), price: 1000, description: (userLang == 'uk' ? 'Добрі' : 'Good'), image: 'https://freepngimg.com/thumb/orange/5-orange-png-image-download.png' },
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
                text: `${(userLang == 'uk' ? 'Купити' : 'Buy')} ${getTotalPrice(newItems)}`,
            });
        }
    };

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch(`${link}/web-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    const onSendId = async () => {
        const data = { userId };
        try {
            const response = await axios.post(`${link}/getUserLanguage`, data);
            const { userL } = response.data;
            setUserLang(userL);
        } catch (error) {
            console.error("Error fetching user language", error);
        }
    };

    useEffect(() => {
        onSendId()
    }, [onSendId])

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
        userLang,
        link,
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
