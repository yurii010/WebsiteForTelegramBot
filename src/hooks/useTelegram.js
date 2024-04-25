import { createContext, useContext, useState, useCallback } from 'react';

const TelegramContext = createContext(); 

export const TelegramProvider = ({ children }) => {
    const [addedItems, setAddedItems] = useState([]);

    const tg = window.Telegram.WebApp;

    const products = [
        { id: '1', title: 'banana', price: 100, description: 'good' },
        { id: '2', title: 'apple', price: 200, description: 'well' },
        { id: '3', title: 'tomato', price: 300, description: 'awesome' },
        { id: '4', title: 'cabbage', price: 400, description: 'amazing' },
        { id: '5', title: 'onion', price: 500, description: 'pretty' },
        { id: '6', title: 'cucumber', price: 600, description: 'sweet' },
        { id: '7', title: 'orange', price: 700, description: 'cool' },
        { id: '8', title: 'peach', price: 800, description: 'nice' },
        { id: '9', title: 'cherry', price: 900, description: 'bad' },
        { id: '10', title: 'tangerin', price: 1000, description: 'norm' },
    ];

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
        fetch('https://1cce-217-196-161-98.ngrok-free.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    const contextValue = {
        tg,
        products,
        addedItems,
        setAddedItems,
        getTotalPrice,
        onSendData,
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
