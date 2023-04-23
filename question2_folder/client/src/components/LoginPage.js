import React, { useState } from "react"
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'



const LoginHeader = () => {
  return (
    <Box textAlign='center'>
      <Heading>Sign In to Your Account</Heading>
    </Box>
  )
}

const LoginForm = ({handler}) => {
  const [usrname, setUsrname] = useState('');
  const [pw, setPw] = useState('');
  

  const handleEmailForm = (e) => {
    setUsrname(e.target.value)
  }

  const handlePwForm = (e) => {
    setPw(e.target.value)
  }

  // username: 'kminchelle',
  // password: '0lelplR', 

  // "username":"atuny0","password":"9uQFF1Lh"

  const loginAction = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usrname,
        password: pw
      })
    })
    .then(res => res.json())
    .then((ret) => {
      localStorage.setItem( 'userCred', JSON.stringify(ret));
      handler(true)
    });
  }


  return (
    <Box my={4} textAlign='left'>
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input onInput={handleEmailForm} type='email' placeholder='Enter your email address' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input onInput={handlePwForm} type='password' placeholder='Enter your password' />
        </FormControl>

        <Button bg='Teal' textColor={'white'} onClick={loginAction} width='full' mt={4}>Sign In</Button>
      </form>
    </Box>
  )
}


const LoginArea = ({h}) => {
  const bgInner = '#FFFFFF'
  return (

    <Flex minHeight='100vh' width='full' 
          align='center' justifyContent='center'>
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
        
        <Box p={4}>
          <LoginHeader />
          <LoginForm handler={h}/>
        </Box>
      </Box>


    </Flex>

  )
}


function LoginPage({handler}) {
  console.log('handler is here');
  console.log(handler)
  
  return (
    <div>
      {
        (
            <LoginArea h={handler}/>
        )
      }
    </div>
  )
}

export default LoginPage