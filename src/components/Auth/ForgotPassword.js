import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
    Box, Button, Container, FormLabel,
    Heading, Input, Stack, Text
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/actions/profile'
import { toast } from 'react-hot-toast'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { loading, message, error } = useSelector((state) => state.profile)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(forgetPassword(email))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: 'clearMessage' })
        }

    }, [dispatch, error, message])

    return (
        <>
            <Container>
                <form style={{ width: '100%' }} onSubmit={submitHandler}>
                    <Heading
                        className='defaultFontFamily'
                        children="Forgot Password"
                        textAlign={['center', 'left']}
                        marginTop={'100px'}
                        marginBottom={8}
                    />

                    <Text fontSize={16} mb={10} >
                        Enter the email associated with your account. we will send a reset password link on your registered email
                    </Text>

                    <Box mb={5}>
                        <FormLabel htmlFor="email" children="Email Address" fontSize={'12px'} m={0} />
                        <Input
                            required
                            id="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            placeholder="example@gmail.com"
                            type="email"
                            focusBorderColor="purple.600"

                        />
                    </Box>

                    <Button
                        colorScheme='purple'
                        fontWeight={300}
                        width={'100%'}
                        fontSize={18}
                        type='submit'
                        isLoading={loading}
                    >
                        Send Reset Link
                    </Button>

                    <Stack alignItems={'flex-end'} my={4}>
                        <Link to={'/login'}
                            style={{
                                fontSize: '15px',
                                textDecoration: 'underline',
                                color: '#6B46C1',
                            }}
                        >
                            Back to Login
                        </Link>
                    </Stack>
                </form>
            </Container>
        </>
    )
}

export default ForgotPassword