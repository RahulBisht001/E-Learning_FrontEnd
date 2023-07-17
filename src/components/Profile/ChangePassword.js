import React, { useEffect, useState } from 'react'
import {
    Container, Heading, Button,
    VStack, Input, Stack, Box, FormLabel
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/actions/profile'

import toast from 'react-hot-toast'

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changePassword(oldPassword, newPassword))
    }

    const { loading, message, error } = useSelector((state) => state.profile)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: 'clearMessage' })
            navigate('/profile')
        }

    }, [dispatch, error, message, navigate])

    return (
        <>
            <Container py='16'>
                <Heading my='10'
                    textAlign={['center', 'left']}
                    className='defaultFontFamily'
                >
                    Change Password
                </Heading>
                <VStack spacing={'5'}>
                    <form style={{ width: '100%' }} onSubmit={submitHandler}>
                        <Box mb={5}>
                            <FormLabel
                                htmlFor="oldPassword"
                                children="Old Password"
                                fontSize={'12px'}
                            />
                            <Input
                                focusBorderColor='purple.600'
                                type='password'
                                placeholder='Enter your old password'
                                required
                                onChange={(e) => setOldPassword(e.target.value)}
                                id='oldPassword'
                                value={oldPassword}
                            />
                        </Box>

                        <Box mb={5}>
                            <FormLabel
                                htmlFor="newPassword"
                                children="New Password"
                                fontSize={'12px'}
                            />
                            <Input
                                focusBorderColor='purple.600'
                                type='password'
                                placeholder='Enter your new password'
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                                id='newPassword'
                                value={newPassword}
                            />
                        </Box>

                        <Button isLoading={loading} type='submit' w='full' colorScheme='purple' fontWeight={300}>
                            Change Password
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

export default ChangePassword