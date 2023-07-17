import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'

import { ChakraProvider } from '@chakra-ui/react';

import { Provider } from 'react-redux'
import store from './redux/store';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);


root.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider >
        <App />
    </ChakraProvider>
    </Provider>
  </StrictMode>
);
