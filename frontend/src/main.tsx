import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './theme.js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DummyLoginPage from './pages/DummyLoginPage.js';
import QuestionPage from './pages/QuestionPage.js';
import NavigationBar from './components/NavigationBar.js';
import UserProfilePage from './pages/UserProfilePage.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DummyLoginPage />
  },
  {
    path: "home",
    element: <QuestionPage />
  },
  {
    path: "profile",
    element: <UserProfilePage />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
