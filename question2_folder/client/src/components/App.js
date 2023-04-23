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

  const [isLoggedIn , setIsLoggedIn] = useState('load');

  const handleSetisLoggedIn = (bool) =>{
    setIsLoggedIn(bool)
  }

  useEffect(() => {
    console.log(localStorage.getItem("userCred"))
    if (!localStorage.getItem("userCred")) {
      console.log('should be here')
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
          isLoggedIn != 'load' && isLoggedIn &&
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