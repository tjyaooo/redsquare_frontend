import {
    Box,
    Flex,
    Image,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react"
  import {
    HamburgerIcon,
    CloseIcon,
  } from "@chakra-ui/icons"

  import {BsFillCartFill } from 'react-icons/bs';
  import { useState, useContext } from "react";
  import ShoppingCart from './ShoppingCart';
  import {ShoppingCartContext} from './App';
  
  export default function Sidebar() {
    const { isOpen, onToggle } = useDisclosure()
    return (
      <Box>
        
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
  
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
            <Image verticalAlign={'middle'} borderRadius='50%' boxSize='4rem' src={JSON.parse(localStorage.getItem('userCred')).image} referrerPolicy= "no-referrer" ></Image>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    )
  }
  
  const DesktopNav = () => {
    const handlePopupOpen = () => {
        setIsPopupOpen(true);
      };

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handlePopupClose = () => {
        setIsPopupOpen(false);
      };
    const { shoppingCartList, setShoppingCartList } = useContext(ShoppingCartContext);

    return (
      <Stack direction={"row"} spacing={4}>
        <Button m='2%' onClick={handlePopupOpen} leftIcon={<BsFillCartFill />} colorScheme='teal' variant='solid'>
            View Cart
        </Button>
        <ShoppingCart cartList={shoppingCartList} isOpen={isPopupOpen} onClose={handlePopupClose} />
      </Stack>
    )
  }
  
 
  
  const MobileNav = () => {
    const handlePopupOpen = () => {
        setIsPopupOpen(true);
      };

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handlePopupClose = () => {
        setIsPopupOpen(false);
      };

    const { shoppingCartList, setShoppingCartList } = useContext(ShoppingCartContext);

    return (
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        <Button m='2%' onClick={handlePopupOpen} leftIcon={<BsFillCartFill />} colorScheme='teal' variant='solid'>
            View Cart
        </Button>
        <ShoppingCart cartList={shoppingCartList} isOpen={isPopupOpen} onClose={handlePopupClose} />
      </Stack>
    )
  }

  