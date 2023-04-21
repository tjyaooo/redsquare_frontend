import React from "react"
import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import NewOrderProduct from './NewOrderProduct'
import "../css/NewOrderPage.css";



const NewOrderArea = () =>{
  return (
    <Flex id="newOrderOptions" >
            <NewOrderProduct prodText='Artwork. Portraits. Moments to be proud of.' productName='Canvas' direct='orderCanvas' imgUrl='/product_showcase/3.png'/>
            <NewOrderProduct prodText='PP Boards. Foam Boards. HI Impact Boards.' productName='Boards' direct='orderBoard' imgUrl='/product_showcase/5.png'/>
            <NewOrderProduct prodText='Tarpauline. Bunting. Posters. Backdrops.' productName='Bunting' direct={'http://localhost:3000/printBunting'} imgUrl='/product_showcase/6.png'/>
            <NewOrderProduct prodText='Gloss stickers. Matte stickers. Car stickers.' productName='Sticker' direct='orderSticker' imgUrl='/product_showcase/1.png'/>
            <NewOrderProduct prodText='Flags. Flag stands. Can be used for beaches.' productName='Fabric' direct='orderFabric' imgUrl='/product_showcase/9.png'/>
            <NewOrderProduct prodText='Artwork. Galleries. Backdrops.' productName='Poster' direct='orderPoster' imgUrl='/product_showcase/7.png'/>
    </Flex>
  )
}
const HomeArea = () => {
  const userObject = JSON.parse(localStorage.getItem( 'userObj' ));
    return (
      <Flex minHeight='100%' >
          <NewOrderArea />
      </Flex>

    )
}

function NewOrderPage() {
  
  
  return (
            < HomeArea/>
  )
}

export default NewOrderPage