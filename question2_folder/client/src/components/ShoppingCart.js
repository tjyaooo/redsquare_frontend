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
      <ModalContent size="lg" maxW='95%'>
        <ModalHeader>Your Shopping Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <TableContainer>
            <Table >
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th isNumeric>Subtotal</Th>
                </Tr>
              </Thead>
              <Tbody>
              {cartList.items.map((itm, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex flexDirection={'column'}>
                      <Text w='100%' fontSize="sm" fontWeight='bold'>{itm.title}</Text>
                      <Text w='100%' fontSize="sm">Price: RM {itm.price}</Text>
                      <Text w='100%' fontSize="sm" >Quantity: {itm.quantity}</Text>
                    </Flex>
                  </Td>
                  <Td isNumeric><Text w='100%' fontSize="sm" fontWeight='bold'>RM {itm.quantity * itm.price}
              </Text></Td>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ModalFooter>
            <Flex flexDir={'column'}>
              <Text fontSize="lg" fontWeight='bold'>   
                Total Cost: RM {cartList.totalPrice}
              </Text>
              <Text fontSize="lg" fontWeight='bold'>   
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
