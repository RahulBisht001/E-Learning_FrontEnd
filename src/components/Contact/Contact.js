import React, { useEffect, useState } from 'react'

import {
    Box, Button, Container, FormLabel,
    Heading, Input, Stack, Textarea, VStack
} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { contactUs } from '../../redux/actions/others';
import toast from 'react-hot-toast'

const Contact = () => {

    const dispatch = useDispatch()
    const { loading, error, message: contactMessage } = useSelector((state) => state.other)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(contactUs(name, email, message))
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({
                type: "clearError"
            })
        }
        if (contactMessage) {
            toast.success(contactMessage);
            dispatch({
                type: "clearMessage"
            })
        }

    }, [contactMessage, dispatch, error])


    return (
        <>
            <Container h={'100vh'} marginTop={['5rem', '3rem']}>

                <VStack>
                    <Heading className='defaultFontFamily' children="Contact us" />
                    <form style={{ width: '100%' }} onSubmit={submitHandler}>
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
                            <FormLabel htmlFor="message" children="Message" fontSize={'12px'} m={0} />
                            <Textarea
                                required
                                id="message"
                                value={message}
                                onChange={e => {
                                    setMessage(e.target.value);
                                }}
                                className='scrollbar'
                                placeholder="Type your message here ..."
                                focusBorderColor="purple.600"
                            />
                        </Box>

                        <Stack justifyContent={'flex-end'} direction={'row'} my={4} fontSize={'14px'}>
                            <p>Request For a Course ?</p>
                            <Link to={'/request'}
                                style={{
                                    textDecoration: 'underline',
                                    color: '#6B46C1',
                                }}
                            >
                                Click Here
                            </Link>
                        </Stack>

                        <Button
                            type='submit'
                            colorScheme='purple'
                            fontWeight={300}
                            width={'100%'}
                            fontSize={18}
                            my={4}
                            isLoading={loading}
                        >
                            Send Message
                        </Button>
                    </form>
                </VStack>

            </Container>
        </>
    )
}

export default Contact