import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
    Box, Button, Container, FormLabel,
    IconButton, Image, Input, InputGroup, InputRightElement, Stack, Text, VStack
} from '@chakra-ui/react'

import Logo from './../../assets/images/UnacademyLogo.png'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

import { login } from '../../redux/actions/user'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <>
            <Container h={'100vh'} marginTop={['5rem', '3rem']}>
                <VStack
                    // h={'full'}
                    justifyContent={'center'}
                    spacing={'4'}
                >

                    <Image width={250} src={Logo} />

                    <form
                        style={{ width: '100%' }}
                        onSubmit={submitHandler}
                    >
                        <Box display={'flex'} fontSize={14} mb={6} >
                            <Text fontWeight={'600'}>
                                New User ?&nbsp;
                            </Text>
                            <Link to={'/register'} style={{ color: '#6B46C1', fontWeight: 600 }}>
                                Create a New Account
                            </Link>
                        </Box>
                        <Box mb={5}>
                            <FormLabel htmlFor="email" children="Email Address" fontSize={'12px'} />
                            <Input
                                required
                                id="email"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="example@gamil.com"
                                type="email"
                                focusBorderColor="purple.600"

                            />
                        </Box>
                        <Box mb={5}>
                            <FormLabel htmlFor="password" children="Password" fontSize={'12px'} />
                            <InputGroup>
                                <Input
                                    required
                                    id="password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder="$3RB@10#$)&"
                                    type={showPassword ? 'text' : 'password'}
                                    focusBorderColor="purple.600"
                                />
                                <InputRightElement width="3rem" alignItems={'center'} justifyContent={'center'}>
                                    <IconButton
                                        onClick={() => { setShowPassword(!showPassword) }}
                                        h="auto"
                                        variant="unstyled"
                                        icon={showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        <Stack alignItems={'flex-end'} my={4}>
                            <Link to={'/forgot-password'}>
                                <Button
                                    size={'sm'}
                                    fontSize={15}
                                    fontWeight={500}
                                    colorScheme='purple'
                                    variant={'ghost'}
                                    textDecor={'underline'}
                                >
                                    Forgot Password ?
                                </Button>
                            </Link>
                        </Stack>

                        <Button
                            colorScheme='purple'
                            fontWeight={300}
                            width={'100%'}
                            fontSize={18}
                            type='submit'
                        >
                            Login
                        </Button>
                    </form>
                </VStack>
            </Container>
        </>
    );
};

export default Login;
