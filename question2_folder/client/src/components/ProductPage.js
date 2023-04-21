
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,

  HStack,
} from '@chakra-ui/react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';


import React, { useState, useEffect } from 'react';

export default function ProductPage() {
  const [liked, setLiked] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => console.log(error));
  }, []);

  return (
    <Flex px='10%' flexWrap={'wrap'} justifyContent='center'>
      {products.map(product => (
          <Center py={6}>
          <Box
            w="23rem"
            h="26rem"
            rounded={'sm'}
            my={5}
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
                objectFit="cover"
                h="full"
                w="full"
                // maxW={'100%'}
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
                {product.title} 
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
                <Text fontSize={'md'} fontWeight={'semibold'}>
                  View more
                </Text>
                <BsArrowUpRight />
              </Flex>
              <Flex
                p={4}
                alignItems="center"
                justifyContent={'space-between'}
                roundedBottom={'sm'}
                borderLeft={'1px'}
                cursor="pointer"
                onClick={() => setLiked(!liked)}>
                {liked ? (
                  <BsHeartFill fill="red" fontSize={'24px'} />
                ) : (
                  <BsHeart fontSize={'24px'} />
                )}
              </Flex>
            </HStack>
            </Flex>
          </Box>
        </Center>
      ))}
    </Flex>
  );



  // return (
  //   <Center py={6}>
  //     <Box
  //       w="xs"
  //       rounded={'sm'}
  //       my={5}
  //       mx={[0, 5]}
  //       overflow={'hidden'}
  //       bg="white"
  //       border={'1px'}
  //       borderColor="black"
  //       boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}>
  //       <Box h={'200px'} borderBottom={'1px'} borderColor="black">
  //         <Img
  //           src={
  //             product.images[0]
  //           }
  //           roundedTop={'sm'}
  //           objectFit="cover"
  //           h="full"
  //           w="full"
  //           alt={'Image'}
  //         />
  //       </Box>
  //       <Box p={4}>
  //         <Box
  //           bg="black"
  //           display={'inline-block'}
  //           px={2}
  //           py={1}
  //           color="white"
  //           mb={2}>
  //           <Text fontSize={'xs'} fontWeight="medium">
  //             {product.title}
  //           </Text>
  //         </Box>
  //         <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
  //           React v18.0
  //         </Heading>
  //         <Text color={'gray.500'} noOfLines={2}>
  //           {product.description}
  //         </Text>
  //       </Box>
  //       <HStack borderTop={'1px'} color="black">
  //         <Flex
  //           p={4}
  //           alignItems="center"
  //           justifyContent={'space-between'}
  //           roundedBottom={'sm'}
  //           cursor={'pointer'}
  //           w="full">
  //           <Text fontSize={'md'} fontWeight={'semibold'}>
  //             View more
  //           </Text>
  //           <BsArrowUpRight />
  //         </Flex>
  //         <Flex
  //           p={4}
  //           alignItems="center"
  //           justifyContent={'space-between'}
  //           roundedBottom={'sm'}
  //           borderLeft={'1px'}
  //           cursor="pointer"
  //           onClick={() => setLiked(!liked)}>
  //           {liked ? (
  //             <BsHeartFill fill="red" fontSize={'24px'} />
  //           ) : (
  //             <BsHeart fontSize={'24px'} />
  //           )}
  //         </Flex>
  //       </HStack>
  //     </Box>
  //   </Center>
  // );
}