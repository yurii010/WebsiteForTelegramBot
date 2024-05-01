import { createContext, useContext, useState, useCallback } from 'react';

const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {

    /* State */

    const [addedItems, setAddedItems] = useState([]);

    /* Properties */

    const tg = window.Telegram.WebApp;
    const queryId = tg.initDataUnsafe?.query_id;
    const user = tg.initDataUnsafe?.user;
    const userId = user?.id;
    const userLanguage = user?.language_code;

    const products = [
        { id: '1', title: (userLanguage == 'uk' || 'ru' ? 'Банани' : 'Banana'), price: 100, description: (userLanguage == 'uk' || 'ru' ? 'Добрі' : 'Good'), image: 'https://freepngimg.com/thumb/banana/13-banana-png-image-bananas-picture-download.png' },
        { id: '2', title: (userLanguage == 'uk' || 'ru' ? 'Яблуко' : 'Apple'), price: 200, description: (userLanguage == 'uk' || 'ru' ? 'Хороші' : 'Well'), image: 'https://freepngimg.com/thumb/apple/9-apple-png-image.png' },
        { id: '3', title: (userLanguage == 'uk' || 'ru' ? 'Ківі' : 'Kiwi'), price: 300, description: (userLanguage == 'uk' || 'ru' ? 'Приголовшливі' : 'Awesome'), image: 'https://freepngimg.com/thumb/kiwi/3-kiwi-png-image-fruit-kiwi-png-pictures-download.png' },
        { id: '4', title: (userLanguage == 'uk' || 'ru' ? 'Малина' : 'Raspberry'), price: 400, description: (userLanguage == 'uk' || 'ru' ? 'Дивовижна' : 'Amazing'), image: 'https://freepngimg.com/thumb/raspberry/3-rraspberry-png-image.png' },
        { id: '5', title: (userLanguage == 'uk' || 'ru' ? 'Чорниця' : 'Blackberry'), price: 500, description: (userLanguage == 'uk' || 'ru' ? 'Прекрасний' : 'Pretty'), image: 'https://freepngimg.com/thumb/blackberry/6-2-blackberry-fruit-free-png-image.png' },
        { id: '6', title: (userLanguage == 'uk' || 'ru' ? 'Кавун' : 'Watermelon'), price: 600, description: (userLanguage == 'uk' || 'ru' ? 'Солодкий' : 'Sweet'), image: 'https://freepngimg.com/thumb/watermelon/4-watermelon-png-image.png' },
        { id: '7', title: (userLanguage == 'uk' || 'ru' ? 'Апельсин' : 'Orange'), price: 700, description: (userLanguage == 'uk' || 'ru' ? 'Крутий' : 'Cool'), image: 'https://freepngimg.com/thumb/orange/12-orange-png-image-download.png' },
        { id: '8', title: (userLanguage == 'uk' || 'ru' ? 'Персик' : 'Peach'), price: 800, description: (userLanguage == 'uk' || 'ru' ? 'Файні' : 'Nice'), image: 'https://freepngimg.com/thumb/peach/4-peach-png-image.png' },
        { id: '9', title: (userLanguage == 'uk' || 'ru' ? 'Вишня' : 'Cherry'), price: 900, description: (userLanguage == 'uk' || 'ru' ? 'Чудові' : 'Great'), image: 'https://freepngimg.com/thumb/cherry/1-red-cherry-png-image-download.png' },
        { id: '10', title: (userLanguage == 'uk' || 'ru' ? 'Мандарин' : 'Tangerin'), price: 1000, description: (userLanguage == 'uk' || 'ru' ? 'Добрі' : 'Good'), image: 'https://freepngimg.com/thumb/orange/5-orange-png-image-download.png' },
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
                text: `${(userLanguage == 'uk' || 'ru' ? 'Купити' : 'Buy')} ${getTotalPrice(newItems)}`,
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
        fetch('https://39c4-217-196-161-98.ngrok-free.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    /* Return */

    const contextValue = {
        tg,
        products,
        addedItems,
        user,
        userId,
        userLanguage,
        setAddedItems,
        getTotalPrice,
        onSendData,
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
