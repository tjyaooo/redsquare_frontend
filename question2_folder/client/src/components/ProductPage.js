
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  HStack,
  Button,
  Divider,
  Select
} from '@chakra-ui/react';
import { BsArrowUpRight, BsFillCartPlusFill } from 'react-icons/bs';


import React, { useState, useEffect } from 'react';

export default function ProductPage() {
  const [liked, setLiked] = useState(false);
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [prevPageButtonDisable, setPrevDisable] = useState(true);
  const [nextPageButtonDisable, setNextDisable] = useState(false);

  console.log('this is the page num')
  console.log(pageNo)
  


  // if(pageNo === products.length){
  //   setPrevDisable(true)
  // } else{
  //   setPrevDisable(false)
  // }

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => console.log(error));
  }, []);

  // for (let i=0; i < products.length; i+10) {
  //   pagesArray.push(i+1);
  // }

  const handleNextPage=() => {
    handlePageChange(pageNo+1)
  }
  const handlePreviousPage=() => {
    handlePageChange(pageNo-1)
  }
  const handleSelectPage=(e) => {
    handlePageChange(Number(e.target.value))
  }

  const handlePageChange = (pageNum) => {
    setPageNo(pageNum)
    if(pageNum === Math.round(products.length/10)){
      setNextDisable(true)
    } else{
      setNextDisable(false)
    }

    if (pageNum === 1){
      setPrevDisable(true)
    } else{
      setPrevDisable(false)
    }
    
  }

  return (
    <Flex px='10%' flexWrap={'wrap'} overflow='hidden'>
      {products.slice((pageNo-1)*10,pageNo*10).map(product => (
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
                {<BsFillCartPlusFill/>}
              </Flex>
            </HStack>
            </Flex>
          </Box>
        </Center>
      ))}
      <Divider/>
      <HStack width='80rem'>
        <Button isDisabled={prevPageButtonDisable} onClick= {handlePreviousPage} colorScheme='teal' size='lg'>
          Previous Page
        </Button>
        <Select  size='lg' value={pageNo} onChange={handleSelectPage}>
          <option hidden disabled value="">Select Page</option>
        {
          products.filter((_, index) => index % 10 === 0).map((value, index) => index + 1).map(idx => (
            <option value={idx}>{idx}</option>
          ))
        }
        
        </Select>
        <Button isDisabled={nextPageButtonDisable} onClick = {handleNextPage} colorScheme='teal' size='lg'>
          Next Page
        </Button>
      </HStack>
    </Flex>
  );
}