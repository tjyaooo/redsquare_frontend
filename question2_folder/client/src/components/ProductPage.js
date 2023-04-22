
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
  Select,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightAddon,
  Stack
} from '@chakra-ui/react';
import { BsArrowUpRight, BsFillCartPlusFill } from 'react-icons/bs';
import {Search2Icon} from  "@chakra-ui/icons"


import React, { useState, useEffect } from 'react';

export default function ProductPage() {
  const [liked, setLiked] = useState(false);
  const [productsUnfil, setProductsUnfil] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [prevPageButtonDisable, setPrevDisable] = useState(true);
  const [nextPageButtonDisable, setNextDisable] = useState(false);
  const [sortByType, setSortbyType] = useState('');
  const [sortByOrder, setSortByOrder] = useState('ASC');

  //prodName and prodCategory
  const [filterByItem, setFilterByItem] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProductsUnfil(data.products);
        setProducts(data.products);
      })
      .catch(error => console.log(error));
  }, []);

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

  const handleFilterTypeChange = (e) => setFilterByItem(e.target.value)

  const handleSearchChange = (e) => {
    if (filterByItem =='prodName'){
      setProducts(productsUnfil.filter(prod => prod.title.toUpperCase().includes(e.target.value.toUpperCase())))
    }
    else if (filterByItem == 'prodCategory'){
      setProducts(productsUnfil.filter(prod => prod.category.toLowerCase().includes(e.target.value.toLowerCase())))
    }
  }

  const handleSortByOrderChange = (e) => {setSortByOrder(e.target.value)}
  const handleSortItemChange = (e) => {setSortbyType(e.target.value)}

  const handleShowSortResults = () => {
    if (sortByType == 'price'){
      let sortedProducts = [];
      if (sortByOrder === 'ASC' ) {
        sortedProducts = [...products].sort((a, b) => a[sortByType] - b[sortByType]);
      } else if (sortByOrder === 'DESC') {
        sortedProducts = [...products].sort((a, b) => b[sortByType] - a[sortByType]);
      }
      setProducts(sortedProducts);
    } else{
      setProducts(productsUnfil)
    }

  };

  return (
    <Flex px='10%' flexWrap={'wrap'} overflow='hidden'>
      <Heading>Search</Heading>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input onInput={handleSearchChange} type="text" placeholder="Search..." border="1px solid #949494" />
        <InputRightAddon
          p={0}
          border="none"
        >
        <Select onChange={handleFilterTypeChange} variant='outline' size='sm' value={filterByItem} >
          <option hidden disabled value="">Select Type</option>
          <option value='prodName'>Product Name</option>
          <option value='prodCategory'>Product Category</option>
        </Select>
      </InputRightAddon>
    </InputGroup>

    <Heading mt='2%'>Sort By</Heading>
    <InputGroup borderRadius={5} size="sm">
        <Select onChange={handleSortItemChange} variant='outline' size='sm' value={sortByType} >
          <option hidden disabled value="">Select Type</option>
          <option value='price'>Product Price</option>
          <option value='category'>Relevance</option>
        </Select>
        <InputRightAddon
          p={0}
          border="none"
        >
        <Select onChange={handleSortByOrderChange} variant='outline' size='sm' value={sortByOrder} >
          <option hidden disabled value="">Select Order</option>
          <option value='ASC'>Ascending</option>
          <option value='DESC'>Descending</option>
        </Select>
      </InputRightAddon>
      <Button onClick = {handleShowSortResults}>Show Sort Results</Button>
    </InputGroup>

    {/* onChange={handleSelectPage} */}

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