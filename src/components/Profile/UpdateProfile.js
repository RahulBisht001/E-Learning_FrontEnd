import React, { useEffect, useState } from 'react'
import {
    Container, Heading, Button,
    VStack, Input, Stack, FormLabel, Box
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../redux/actions/profile'
import { getMyProfile } from '../../redux/actions/user';
import { toast } from 'react-hot-toast'


const UpdateProfile = ({ user }) => {
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message, error, loading } = useSelector((state) => state.profile);

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(updateProfile(name, email))
            .then(() => {
                navigate('/profile')
            })


    }
    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch({
                type: "clearMessage"
            })
            setTimeout(() => {
                dispatch(getMyProfile())
            }, 1000)
        }
        if (error) {
            toast.error(error)
            dispatch({
                type: "clearError"
            })
        }
    }, [message, error, dispatch])

    return (
        <>
            <Container py='16' >
                <Heading
                    my='10'
                    textAlign={['center', 'left']}
                    className='defaultFontFamily'
                >
                    Update Profile
                </Heading>
                <VStack spacing={'5'}>
                    <form style={{ width: '100%' }} onSubmit={submitHandler}>
                        <Box mb={5}>
                            <FormLabel
                                htmlFor="name"
                                children="Name"
                                fontSize={'12px'}
                            />
                            <Input
                                focusBorderColor='purple.600'
                                type='text'
                                placeholder='Name'
                                required
                                onChange={(e) => setName(e.target.value)}
                                id='name'
                                value={name}
                            />
                        </Box>

                        <Box mb={5}>
                            <FormLabel
                                htmlFor="email"
                                children="Email"
                                fontSize={'12px'}
                            />
                            <Input
                                focusBorderColor='purple.600'
                                type='email'
                                placeholder='Email'
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                id='email'
                                value={email}
                            />
                        </Box>

                        <Button
                            isLoading={loading}
                            type='submit'
                            w='full'
                            colorScheme='purple'
                            fontWeight={300}
                        >
                            Update Profile
                        </Button>
                    </form>
                </VStack>
                <Stack alignItems={'flex-end'} my={4}>
                    <Link to={'/profile'}>
                        <Button
                            size={'sm'}
                            fontSize={15}
                            fontWeight={500}
                            colorScheme='purple'
                            variant={'ghost'}
                            textDecor={'underline'}
                        >
                            Back to Profile Page
                        </Button>
                    </Link>
                </Stack>
            </Container>
        </>
    )
}

export default UpdateProfile