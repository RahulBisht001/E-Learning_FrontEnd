import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import {
    Avatar, Box, Button, Container, FormLabel,
    IconButton, Image, Input, InputGroup, InputRightElement, Text, VStack
} from '@chakra-ui/react';


import Logo from './../../assets/images/UnacademyLogo.png'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';


export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#805AD5',
    backgroundColor: '#FFF'
}

const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss
}



const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [imgPreview, setImgPreview] = useState('')

    const [img, setImg] = useState('')


    //** This is very important code ( File Select) */

    //? _____________________________________________________________________

    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        console.log("Your Files Object")
        console.log(file)

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImgPreview(reader.result)

            setImg(file)
            console.log(img)
        }
    }
    //? _____________________________________________________________________

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.append('name', name)
        myForm.append('email', email)
        myForm.append('password', password)
        myForm.append('file', img)

        dispatch(register(myForm))
    }

    return (
        <>
            <Container marginTop={['5rem', '3rem']} >
                <VStack
                    // h={'full'}
                    justifyContent={'center'}
                    spacing={'4'}
                >

                    <Image width={250} src={Logo} />

                    <form style={{ width: '100%' }} onSubmit={submitHandler}>
                        <Box my={4} display={'flex'} justifyContent={'center'}>
                            <Avatar src={imgPreview} size={'xl'} />
                        </Box>

                        <Box display={'flex'} fontSize={14} mb={6} >
                            <Text fontWeight={'600'}>
                                Already Have an account ?&nbsp;
                            </Text>
                            <Link to={'/login'} style={{ color: '#6B46C1', fontWeight: 600 }}>
                                Log in
                            </Link>
                        </Box>

                        <Box mb={5}>
                            <FormLabel htmlFor="name" children="User Name" fontSize={'12px'} m={0} />
                            <Input
                                required
                                id="name"
                                value={name}
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                                placeholder="Rahul B"
                                type="text"
                                focusBorderColor="purple.600"

                            />
                        </Box>
                        <Box mb={5}>
                            <FormLabel htmlFor="email" children="Email Address" fontSize={'12px'} m={0} />
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
                            <FormLabel htmlFor="password" children="Password" fontSize={'12px'} m={0} />
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

                        <Box mb={5}>
                            <FormLabel htmlFor="chooseAvatar" children="Avatar" fontSize={'12px'} m={0} />
                            <Input
                                alignSelf={'center'}
                                required
                                id="chooseAvatar"
                                accept='image/*'
                                type="file"
                                focusBorderColor="purple.600"
                                css={
                                    fileUploadStyle
                                }
                                onChange={changeImageHandler}
                            />
                        </Box>


                        <Button
                            colorScheme='purple'
                            fontWeight={300}
                            width={'100%'}
                            fontSize={18}
                            type='submit'
                        >
                            Register
                        </Button>

                    </form>
                </VStack>
            </Container>
        </>
    );
};

export default Register