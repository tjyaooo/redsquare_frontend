import React from "react"
import {
  Flex,
  useColorModeValue,
  Center
} from '@chakra-ui/react'
import Sidebar from './Sidebar'
import "../css/SideBarPlusContentPage.css";

// <meta name="referrer" content="no-referrer" />



const ContentArea = ({component}) =>{
  console.log(component);
  return (
    <Flex id="contentDiv">
      {component}
    </Flex>
  )
}
const Compiled = ({component}) => {
  const userObject = JSON.parse(localStorage.getItem( 'userObj' ));
  const bgOuter = useColorModeValue('#F2F2F2', '#252525')

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
            < Compiled component={component}/>
  )
}

export default SideBarPlusContentPage