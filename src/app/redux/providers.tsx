import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import {store} from './store'; 

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: any) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
