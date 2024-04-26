import { createContext, useContext, useState, useCallback } from 'react';

const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {

    /* State */

    const [addedItems, setAddedItems] = useState([]);

    /* Properties */

    const tg = window.Telegram.WebApp;
    const queryId = tg.initDataUnsafe?.query_id;

    const products = [
        { id: '1', title: 'Banana', price: 100, description: 'Good', image: 'https://freepngimg.com/thumb/banana/13-banana-png-image-bananas-picture-download.png' },
        { id: '2', title: 'Apple', price: 200, description: 'Well', image: 'https://freepngimg.com/thumb/apple/9-apple-png-image.png' },
        { id: '3', title: 'Kiwi', price: 300, description: 'Awesome', image: 'https://freepngimg.com/thumb/kiwi/3-kiwi-png-image-fruit-kiwi-png-pictures-download.png' },
        { id: '4', title: 'Raspberry', price: 400, description: 'Amazing', image: 'https://freepngimg.com/thumb/raspberry/3-rraspberry-png-image.png' },
        { id: '5', title: 'Blackberry', price: 500, description: 'Pretty', image: 'https://freepngimg.com/thumb/blackberry/6-2-blackberry-fruit-free-png-image.png' },
        { id: '6', title: 'Watermelon', price: 600, description: 'Sweet', image: 'https://freepngimg.com/thumb/watermelon/4-watermelon-png-image.png' },
        { id: '7', title: 'Orange', price: 700, description: 'Cool', image: 'https://freepngimg.com/thumb/orange/12-orange-png-image-download.png' },
        { id: '8', title: 'Peach', price: 800, description: 'Nice', image: 'https://freepngimg.com/thumb/peach/4-peach-png-image.png' },
        { id: '9', title: 'Cherry', price: 900, description: 'Great', image: 'https://freepngimg.com/thumb/cherry/1-red-cherry-png-image-download.png' },
        { id: '10', title: 'Tangerin', price: 1000, description: 'Good', image: 'https://freepngimg.com/thumb/orange/5-orange-png-image-download.png' },
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
                text: `Buy ${getTotalPrice(newItems)}`,
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
        fetch('https://0f86-217-196-161-98.ngrok-free.app/web-data', {
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
        user: tg.initDataUnsafe?.user,
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
