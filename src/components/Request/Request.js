import React, { useEffect, useState } from 'react'

import { Box, Button, Container, FormLabel, Heading, Input, Stack, Textarea, VStack } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/others';
import { toast } from 'react-hot-toast';

const Request = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('')

    const dispatch = useDispatch()
    const { loading, error, message } = useSelector((state) => state.other)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(courseRequest(name, email, course))
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({
                type: "clearError"
            })
        }
        if (message) {
            toast.success(message);
            dispatch({
                type: "clearMessage"
            })
        }

    }, [message, dispatch, error])


    return (
        <>
            <Container h={'100vh'} marginTop={['5rem', '3rem']}>

                <VStack>
                    <Heading className='defaultFontFamily' children="Request For a Course" />
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
                            <FormLabel htmlFor="course" children="Course Request" fontSize={'12px'} m={0} />
                            <Textarea
                                required
                                id="course"
                                value={course}
                                onChange={e => {
                                    setCourse(e.target.value);
                                }}
                                className='scrollbar'
                                placeholder="Explain the course you want and why ..."
                                focusBorderColor="purple.600"
                            />
                        </Box>

                        <Stack justifyContent={'flex-end'} direction={'row'} my={4} fontSize={'14px'}>
                            <p>See Available Course !</p>
                            <Link to={'/courses'}
                                style={{
                                    textDecoration: 'underline',
                                    color: '#6B46C1',
                                }}
                            >
                                Click Here
                            </Link>
                        </Stack>

                        <Button
                            colorScheme='purple'
                            fontWeight={300} width={'100%'}
                            fontSize={18} my={4}
                            type='submit'
                            isLoading={loading}
                        >
                            Request For a Course
                        </Button>
                    </form>
                </VStack>

            </Container>
        </>
    )
}

export default Request