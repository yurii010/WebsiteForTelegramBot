import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TelegramProvider } from './hooks/useTelegram';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider value={value}>
      <TelegramProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TelegramProvider>
    </Provider>
  </React.StrictMode>
);

