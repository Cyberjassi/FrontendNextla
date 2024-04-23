// provider is use for wrap our next js app

'use client'
import { Provider } from 'react-redux';
import { store } from './store';

const {provider} = require('react-redux');

export function Providers({children}){
    return <Provider  store={store}>
        {children}
    </Provider>
}