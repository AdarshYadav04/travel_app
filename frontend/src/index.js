import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CategoryProvider } from './Context/category-context';
import { DateProvider } from './Context/date-context';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/auth-context';
import { WishlistProvider } from './Context/wishlist-context';
import { HotelProvider } from './Context/hotel-context';
import { AlertProvider } from './Context/alet-context';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './Context/user-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserProvider>
          <CategoryProvider>
            <DateProvider>
              <AuthProvider>
                <WishlistProvider>
                  <HotelProvider>
                    <AlertProvider>
                      <App />
                      <ToastContainer/>
                    </AlertProvider>
                  </HotelProvider>
                </WishlistProvider>
              </AuthProvider>
            </DateProvider>   
          </CategoryProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter> 
  </React.StrictMode>
);

