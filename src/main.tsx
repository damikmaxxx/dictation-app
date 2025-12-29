import React, { Suspense } from 'react'; // 1. Добавили Suspense
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import App from './app/App';
import { Loader } from 'shared/ui'; // 2. Наш Лоадер

import 'antd/dist/reset.css';
import 'shared/config/i18n/i18n'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader fullScreen />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);