import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './Compound/StateContext';
import AppRouter from './Routers/AppRouter';
import ScrollToTop from './Compound/ScrollToTop';

export default function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </StateProvider>
  );
}
