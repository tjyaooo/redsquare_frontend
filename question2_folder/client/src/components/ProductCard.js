import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ProductPopup from "./ProductPopup";

import {
    Heading,
    Img,
    Flex,
    Center,
    HStack,
    Button
  } from '@chakra-ui/react';
  import {BsFillCartPlusFill } from 'react-icons/bs';

const ProductCard = ({ product, handleAddToCart }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleClick = () => {
    handleAddToCart(product);
  };

  return (
    <Box borderWidth="1px" borderColor='transparent' borderRadius="lg" overflow="hidden">
   <Center py={6}>
          <Box
            w="20rem"
            h="26rem"
            rounded={'sm'}
            mx={[0, 5]}
            overflow={'hidden'}
            bg="none"
            border={'1px'}
            borderColor="black"
            boxShadow='6px 6px 0 black'>
            <Box h={'200px'} borderBottom={'1px'} borderColor="black">
                <Box
                    h="100%"
                    w="100%"
                    pb="55%"
                    bgImage={product.images[product.images.length-1]}
                    bgSize="cover"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    />
            </Box>
            <Box p={4} h='38%'>
              <Box
                bg="black"
                display={'inline-block'}
                px={2}
                py={1}
                color="white"
                mb={2}
                >
                <Text fontSize={'xs'} fontWeight="medium">
                  RM {product.price}
                </Text>
              </Box>
              <Heading color={'black'} fontSize={'2xl'} noOfLines={2}>
                {product.title.toUpperCase()} 
              </Heading>
              <Text color={'gray.500'} noOfLines={2}>
                {product.category}
              </Text>
            </Box>

            <HStack borderTop={'1px'} color="black">
                <Flex mt='3%' w='full' h='full' alignItems={'center'} justifyContent='center' gap='0.5rem'>
                    <Button fontSize={'md'} fontWeight={'semibold'} onClick={handlePopupOpen}>View Details</Button>
        
                    <Button onClick={handleClick} leftIcon={<BsFillCartPlusFill />} colorScheme='teal' variant='solid'>
                        Add to Cart
                    </Button>
                </Flex>
            </HStack>

          </Box>
        </Center>
      <ProductPopup product={product} isOpen={isPopupOpen} onClose={handlePopupClose} />
    </Box>
  );
};

export default ProductCard;