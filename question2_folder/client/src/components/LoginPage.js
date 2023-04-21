import React from "react"
import { Center, Image } from '@chakra-ui/react'
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:5000/'
}
)
const VARIANT_COLOR = 'yellow'

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign='right' py={3}>
      <IconButton  aria-label='Switch light modes'
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant='ghost'
      />
    </Box>
  )
}

const LoginHeader = () => {
  return (
    <Box textAlign='center'>
      <Heading>Sign In to Your Account</Heading>
    </Box>
  )
}

const LoginForm = () => {
  return (
    <Box my={4} textAlign='left'>
      <form>

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' placeholder='Enter your email address' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Enter your password' />
        </FormControl>

        <Stack isInline justifyContent='space-between' mt={4}>
            <Box>
              <Checkbox>Remember Me</Checkbox>
            </Box>
            <Box>
              <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
            </Box>
        </Stack>

        <Button  width='full' mt={4}>Sign In</Button>
      </form>
    </Box>
  )
}


const LoginArea = () => {
  const authenticate = () => {
    window.open("http://localhost:5000/auth/google", "_self");
    //   api.get('/auth/google')
    //     .then(function (response) {
    //     return response.json();
    //   })
    //     .catch(function (error) {
    //     console.log(error.response.data);
    //  });
  }
  const bgInner = useColorModeValue('#FFFFFF', '#252525')
  const bgOuter = useColorModeValue('#EBF8FF', '#252525')
  return (

    <Flex minHeight='100vh' width='full' 
          align='center' justifyContent='center'
          bg={bgOuter}>
      <Box 
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='500px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
        bg={bgInner}
      >
          <Center>
          <Image mt={10}
            borderRadius='full'
            boxSize='150px'
            textAlign='center'
            src=
            '/qmprint_login.png'
          />
          </Center>
        
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>

        <IconButton 
          aria-label='Google Icon' 
          icon={<FcGoogle/>} 
          variant='ghost'
          size='4.5rem'
          fontSize='4.5rem'
          onClick={() =>authenticate()}/>
      <ThemeSelector />
      </Box>


    </Flex>

  )
}


function LoginPage() {
  
  return (
    <div>
      {
        (
          <ThemeProvider theme={theme}>
            <ColorModeProvider>
            <LoginArea/>
            </ColorModeProvider>
          </ThemeProvider>
        )
      }
    </div>
  )
}

export default LoginPage