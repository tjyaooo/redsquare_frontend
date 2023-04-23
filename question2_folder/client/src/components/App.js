import React,{useEffect, useState } from "react"
import SideBarPlusContentPage from './SideBarPlusContentPage';
import ProductPage from './ProductPage';
import { createContext } from 'react';

export const ShoppingCartContext = createContext();


function App() {
  const [shoppingCartList, setShoppingCartList] = useState({
    items: [],
    totalPrice: 0,
    totalItems: 0
  });

  return (
    <ShoppingCartContext.Provider value={{ shoppingCartList, setShoppingCartList }}>
      <SideBarPlusContentPage component={<ProductPage/>}/>
    </ShoppingCartContext.Provider>
  )
}       
  

export default App