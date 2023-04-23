import { Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";

const ProductPopup = ({ product, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW='90%'>
        <ModalHeader>{product.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Image src={product.images[product.images.length-1]}></Image>
          <Text fontSize="lg">{product.description}</Text>
          <Text fontSize="sm" mt={4}>Price: RM{product.price}</Text>
          <Text fontSize="sm" mt={4}>Brand: {product.brand}</Text>
          <Text fontSize="sm" mt={4}>Category: {product.category}</Text>
          <Text fontSize="sm" mt={4}>Rating: {product.rating}</Text>
          <Text fontSize="sm" mt={4}>Stock: {product.stock}</Text>
          <Text fontSize="sm" mt={4}>Discount: {product.discountPercentage}%</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductPopup;