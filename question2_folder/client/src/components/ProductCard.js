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
  import { BsArrowUpRight, BsFillCartPlusFill } from 'react-icons/bs';

const ProductCard = ({ product }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
   <Center py={6}>
          <Box
            w="23rem"
            h="26rem"
            rounded={'sm'}
            mx={[0, 5]}
            overflow={'hidden'}
            bg="white"
            border={'1px'}
            borderColor="black"
            boxShadow='6px 6px 0 black'>
            <Box h={'200px'} borderBottom={'1px'} borderColor="black">
              <Img
                src={
                  product.images[product.images.length-1]
                }
                roundedTop={'sm'}
                objectFit="fill"
                h="full"
                w="full"
                alt={'Image'}
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
            <Flex flexDir={'column'} justifyContent='flex-end' flex='1'>
            <HStack borderTop={'1px'} color="black">
              <Flex
                p={4}
                alignItems="center"
                justifyContent={'space-between'}
                roundedBottom={'sm'}
                cursor={'pointer'}
                w="full">
                <Button bg='none' fontSize={'md'} fontWeight={'semibold'} onClick={handlePopupOpen}>View Details</Button>
              </Flex>
              <Flex
                p={4}
                alignItems="center"
                justifyContent={'space-between'}
                roundedBottom={'sm'}
                borderLeft={'1px'}>
                {<BsFillCartPlusFill/>}
              </Flex>
            </HStack>
            </Flex>
          </Box>
        </Center>
      <ProductPopup product={product} isOpen={isPopupOpen} onClose={handlePopupClose} />
    </Box>
  );
};

export default ProductCard;