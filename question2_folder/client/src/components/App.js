import React,{useState, useEffect } from "react"
import SideBarPlusContentPage from './SideBarPlusContentPage';
import ProductPage from './ProductPage';
import LoginPage from './LoginPage';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const ShoppingCartContext = createContext();


function App() {
  const [shoppingCartList, setShoppingCartList] = useState({
    items: [],
    totalPrice: 0,
    totalItems: 0
  });

  const [isLoggedIn , setIsLoggedIn] = useState(true);

  const handleSetisLoggedIn = (bool) =>{
    setIsLoggedIn(bool)
  }

  useEffect(() => {
    if (!localStorage.getItem("userCred")) {
      setIsLoggedIn(false)
    } else{
      setIsLoggedIn(true)
    }
  }, []);

  

  return (
    <ShoppingCartContext.Provider value={{ shoppingCartList, setShoppingCartList }}>
      <BrowserRouter>
        <Routes>
        {
          !isLoggedIn &&
          <Route
            path='*'
            element={<LoginPage handler={handleSetisLoggedIn}/>}
          />
        }

        {
          isLoggedIn &&
          <Route
            path='*'
            element={<SideBarPlusContentPage component={<ProductPage/>}/>}
          />
        }
       
        </Routes>
      </BrowserRouter>
    </ShoppingCartContext.Provider>
  )
}       
  

export default App