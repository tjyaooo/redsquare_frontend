
import {
  Heading,
  Flex,
  HStack,
  Button,
  Divider,
  Select,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import {Search2Icon} from  "@chakra-ui/icons"


import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import {ShoppingCartContext} from './App';

export default function ProductPage() {
  const toast = useToast();
  const [productsUnfil, setProductsUnfil] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [prevPageButtonDisable, setPrevDisable] = useState(true);
  const [nextPageButtonDisable, setNextDisable] = useState(false);
  const [sortByType, setSortbyType] = useState('');
  

  //prodName and prodCategory
  const [filterByItem, setFilterByItem] = useState('prodName');
  const { shoppingCartList, setShoppingCartList } = useContext(ShoppingCartContext);

  useEffect(() => {
    const tokenHeader = JSON.parse(localStorage.getItem('userCred')).token;
    fetch('https://dummyjson.com/products?limit=0', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ {tokenHeader}, 
        'Content-Type': 'application/json'
      }, 
    })
      .then(res => res.json())
      .then(data => {
        setProductsUnfil(data.products);
        setProducts(data.products);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if(pageNo === Math.ceil(products.length/10)){
      setNextDisable(true)
    } else{
      setNextDisable(false)
    }

    if (pageNo === 1){
      setPrevDisable(true)
    } else{
      setPrevDisable(false)
    }
  }, [pageNo,products]);

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

  const handleSortItemChange = (e) => {setSortbyType(e.target.value)}

  const handleShowSortResults = () => {
    let sortedProducts = []
    if (sortByType == 'priceASC'){
        sortedProducts = [...products].sort((a, b) => a['price'] - b['price']);
        setProducts(sortedProducts);
      }
    else if (sortByType == 'priceDESC') {
        sortedProducts = [...products].sort((a, b) => b['price'] - a['price']);
        setProducts(sortedProducts);
    }
    else {
      setProducts(productsUnfil)
    }
    setPageNo(1)
  }

  const addItemToCart = (item) => {
    
    const existingItemIndex = shoppingCartList.items.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      const updatedItems = [...shoppingCartList.items];
      updatedItems[existingItemIndex].quantity += 1;
  
      setShoppingCartList({
        items: updatedItems,
        totalPrice: shoppingCartList.totalPrice + item.price,
        totalItems: shoppingCartList.totalItems + 1
      });
    } else {
      // If the item doesn't exist in the cart, add it as a new item
      item.quantity=1
      setShoppingCartList({
        items: [...shoppingCartList.items, item],
        totalPrice: shoppingCartList.totalPrice + item.price,
        totalItems: shoppingCartList.totalItems + 1
      });
    }
    toast({
      title: "Item added to cart",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex alignItems={'center'} px='5%' flexDirection={'column'} overflow='hidden' maxW='100%'>

      <Flex w='95%' mt='2%'>
      <InputGroup borderRadius={'lg'} size="md">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input borderRadius={["lg", "lg"]} onInput={handleSearchChange} type="text" placeholder="Search..."  border="1px solid #949494" />
        <InputRightAddon 
          ml='1%'
          p={0}
          borderRadius={'lg'}
          width='10rem'
        >
        <Select borderRadius={'lg'} onChange={handleFilterTypeChange} variant='outline' value={filterByItem} >
          <option value='prodName'>Name</option>
          <option value='prodCategory'>Category</option>
        </Select>
        </InputRightAddon>
      </InputGroup>
    </Flex>
    <Flex mt='2%' w='95%'>
      <Heading alignSelf={'flex-start'} as='h4' size='md' mt='2%'>Sort By</Heading>
    </Flex>
    <Flex w='95%' mt='2%'>
      <Select borderRadius={'lg'} borderColor='#949494' onChange={handleSortItemChange} variant='outline'  size="md" value={sortByType} >
        <option hidden disabled value="">Relevance</option>
        <option value='category'>Relevance</option>
        <option value='priceASC'>Price (Ascending)</option>
        <option value='priceDESC'>Price (Descending)</option>
      </Select>
      <Button bg='#ED64A6' textColor={'white'} ml='1%' onClick={handleShowSortResults}>Sort</Button>
    </Flex>

    <Flex mt='0' flexWrap={'wrap'} overflow='hidden' justifyContent={'center'}>
      {products.slice((pageNo-1)*10,pageNo*10).map(product => (
        <ProductCard key={product.id} product={product} handleAddToCart={addItemToCart}/>
      ))}
    </Flex>
    
      <Divider/>
      <HStack width='100%'>
        <Button isDisabled={prevPageButtonDisable} onClick= {handlePreviousPage} colorScheme='teal' size='lg'>
          Previous
        </Button>
        <Select  size='lg' value={pageNo} onChange={handleSelectPage}>
          <option hidden disabled value="">Select Page</option>
        {
          products.filter((_, index) => index % 10 === 0).map((value, index) => index + 1).map(idx => (
            <option key = {idx} value={idx}>{idx}</option>
          ))
        }
        </Select>
        <Button isDisabled={nextPageButtonDisable} onClick = {handleNextPage} colorScheme='teal' size='lg'>
          Next
        </Button>
      </HStack>

    </Flex>
  );
}