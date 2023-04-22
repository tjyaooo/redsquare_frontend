
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
  useToast
} from '@chakra-ui/react';
import {Search2Icon} from  "@chakra-ui/icons"


import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ShoppingCart from './ShoppingCart';
import {BsFillCartFill } from 'react-icons/bs';

export default function ProductPage() {
  const toast = useToast();
  const [productsUnfil, setProductsUnfil] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [prevPageButtonDisable, setPrevDisable] = useState(true);
  const [nextPageButtonDisable, setNextDisable] = useState(false);
  const [sortByType, setSortbyType] = useState('');
  const [sortByOrder, setSortByOrder] = useState('ASC');
  

  //prodName and prodCategory
  const [filterByItem, setFilterByItem] = useState('');

  const [shoppingCartList, setShoppingCartList] = useState({
    items: [],
    totalPrice: 0,
    totalItems: 0
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
 

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

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
      console.log('shoppingcartlist before')
      console.log(shoppingCartList)
      console.log('item in question')
      console.log(item)
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
    <Flex alignItems={'center'} px='10%' flexDirection={'column'} overflow='hidden'>

      <Heading>Search</Heading>
      <InputGroup borderRadius={5} size="sm" w='65%'>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input onInput={handleSearchChange} type="text" placeholder="Search..." border="1px solid #949494" />
        <InputRightAddon
          ml='1%'
          p={0}
          border="none"
        >
        <Select  onChange={handleFilterTypeChange} variant='outline' size='sm' value={filterByItem} >
          <option hidden disabled value="">Select Type</option>
          <option value='prodName'>Product Name</option>
          <option value='prodCategory'>Product Category</option>
        </Select>
      </InputRightAddon>
    </InputGroup>

    <Heading mt='2%'>Sort By</Heading>
    <InputGroup mt='1%' borderRadius={5} size="sm" w='65%'>
        <Select borderColor='#949494' onChange={handleSortItemChange} variant='outline' size='sm' value={sortByType} >
          <option hidden disabled value="">Select Type</option>
          <option value='price'>Product Price</option>
          <option value='category'>Relevance</option>
        </Select>
        <InputRightAddon
          p={0}
          ml='1%'
          border="none"
        >
        <Select onChange={handleSortByOrderChange} variant='outline' size='sm' value={sortByOrder} >
          <option hidden disabled value="">Select Order</option>
          <option value='ASC'>Ascending</option>
          <option value='DESC'>Descending</option>
        </Select>
      </InputRightAddon>
      <Button ml='1%' onClick={handleShowSortResults}>Sort Results</Button>
    </InputGroup>

    <Button m='2%' onClick={handlePopupOpen} leftIcon={<BsFillCartFill />} colorScheme='teal' variant='solid'>
        View Cart
      </Button>

    {/* onChange={handleSelectPage} */}

    <Flex flexWrap={'wrap'} overflow='hidden' justifyContent={'center'}>
      {products.slice((pageNo-1)*10,pageNo*10).map(product => (
        <ProductCard key={product.id} product={product} handleAddToCart={addItemToCart}/>
      ))}
    </Flex>
    <ShoppingCart cartList={shoppingCartList} isOpen={isPopupOpen} onClose={handlePopupClose} />
      <Divider/>
      <HStack width='80rem'>
        <Button isDisabled={prevPageButtonDisable} onClick= {handlePreviousPage} colorScheme='teal' size='lg'>
          Previous Page
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
          Next Page
        </Button>
      </HStack>

    </Flex>
  );
}