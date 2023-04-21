import React from 'react'
import {
    Text,
    Image,
    Button,
    Card,
    CardBody,
    CardFooter,
    Stack,
    Heading,
    Divider,
    useColorModeValue
} from '@chakra-ui/react'


export default function NewOrderProduct({ productName, direct, prodText, imgUrl}) {
    const bg = useColorModeValue('#FFFFFF','#353535')
    return (
        <Card boxShadow='xl' w='20rem' h='21rem' bg={bg}>
        <CardBody height='80%'>
            <Image
            src= {imgUrl}
            alt={productName}
            borderRadius='lg'
            height='60%'
            width='100%'
            />
            <Stack height='40%' mt='5%' >
            <Heading size='md'>{productName}</Heading>
            <Text fontSize='1rem'>
                {prodText}
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter padding='5%'>
            <Button variant='solid' colorScheme='blue' onClick = {event =>  window.location.href=direct}>
                Print {productName}
            </Button>
        </CardFooter>
        </Card>
    )
}


{/* <Flex
backgroundColor={"#A8A8A8"}
p={5}
borderRadius={8}
flexDirection='column'
>
    <Image height='30vmin' width='40vmin'className="image" alt ='order' src = {imgUrl}/>

    <Button colorScheme='twitter' variant='solid'  p={6} mt={5}  onClick = {event =>  window.location.href=direct}>
        <Text as='b' fontSize={25}>Print {productName}</Text>
    </Button>



</Flex> */}