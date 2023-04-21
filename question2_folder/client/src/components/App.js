import React,{useEffect, useState } from "react"
import axios from 'axios'
import SideBarPlusContentPage from './SideBarPlusContentPage';
import ProductPage from './ProductPage';

const api = axios.create({
  baseURL: 'http://localhost:5000'
}
)

function App() {
          return (
              <SideBarPlusContentPage component={<ProductPage/>}/>
          )
}       
  

export default App