import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './theme.js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import router from './router.js';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </ChakraProvider>
  // </React.StrictMode>
);
