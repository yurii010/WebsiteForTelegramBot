const tg = window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.close();
    }

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

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
    ] 

    return {
        tg,
        user: tg.initDataUnsafe?.user,
        onClose,
        onToggleButton,
        queryId: tg.initDataUnsafe?.query_id,
        products,
    }

}