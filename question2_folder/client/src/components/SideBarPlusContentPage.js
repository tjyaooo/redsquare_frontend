import React from "react"
import {
  Flex,
  Center
} from '@chakra-ui/react'
import Sidebar from './Sidebar'
import "../css/SideBarPlusContentPage.css";

const ContentArea = ({component}) =>{
  return (
    <Flex id="contentDiv">
      {component}
    </Flex>
  )
}
const Compiled = ({component}) => {
  const userObject = JSON.parse(localStorage.getItem( 'userCred' ));
  const bgOuter = '#F2F2F2'

  if(userObject){
    
    return (
      <Flex bg = {bgOuter} minHeight='100vh' flexDirection={'column'}>
          <Sidebar />
          <ContentArea component={component}/>
      </Flex>

    )
  }
  else{
    return (
      <Center>Not authenticated</Center>
    )
  }
}

function SideBarPlusContentPage({component}) {
  
  
  return (
            <Compiled component={component}/>
  )
}

export default SideBarPlusContentPage