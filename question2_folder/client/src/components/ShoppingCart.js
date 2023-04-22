import { Grid, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const ShoppingCart = ({ cartList, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent size="lg" maxW='65%'>
        <ModalHeader>Your Shopping Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          
            <TableContainer>
            <Table >
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Price (RM)</Th>
                  <Th>Brand</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Subtotal</Th>
                </Tr>
              </Thead>
              <Tbody>
              {cartList.items.map((itm) => (
                <Tr>
                  <Td><Text w='100%' fontSize="sm"  fontWeight='bold'>{itm.title}</Text></Td>
                  <Td><Text w='100%' fontSize="sm"> RM {itm.price}</Text></Td>
                  <Td> <Text w='100%' fontSize="sm">{itm.brand}</Text></Td>
                  <Td><Text w='100%' fontSize="sm">{itm.category}</Text></Td>
                  <Td isNumeric> <Text w='100%' fontSize="sm" >{itm.quantity}</Text></Td>
                  <Td isNumeric><Text w='100%' fontSize="sm" fontWeight='bold'>RM {itm.quantity * itm.price}
              </Text></Td>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ModalFooter>
            <Flex m={10} flexDir={'column'}>
              <Text fontSize="xl" fontWeight='bold'>   
                Total Cost: RM {cartList.totalPrice}
              </Text>
              <Text fontSize="xl" fontWeight='bold'>   
                Total Number of Items: {cartList.totalItems}
              </Text>
            </Flex>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShoppingCart;
