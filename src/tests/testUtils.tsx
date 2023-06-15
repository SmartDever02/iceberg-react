import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import dataSlice, { initialState } from 'redux/slices/dataSlice';
import { mockNFTs } from './data';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

const store = configureStore({
  reducer: {
    app: dataSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;

const mockStates = {
  ...initialState,
  data: mockNFTs,
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      app: mockStates,
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        app: dataSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
