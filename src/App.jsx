import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './Compound/StateContext';
import AppRouter from './Routers/AppRouter';

export default function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StateProvider>
  );
}
