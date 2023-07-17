import React, { useEffect, useState } from 'react';
import {
    Box, Stack, HStack, Heading, Text, VStack,
    useColorModeValue, List, ListItem, ListIcon, Button,
} from '@chakra-ui/react';

import { FaCheckCircle } from 'react-icons/fa';

import Plans from '../../constants/Plans'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user'

import logo from '../../assets/images/Logo.png'


const PriceWrapper = ({ title, price, features, isPopular, user }) => {

    const dispatch = useDispatch()
    const { loading, error, subscriptionId } = useSelector((state) => state.subscription)
    const { error: courseError } = useSelector((state) => state.course)


    const [key, setKey] = useState('')

    const subscribeHandler = async () => {

        const { data } = await axios.get(`${server}/razorpayKey`,
            { withCredentials: true })
        setKey(data.key)
        dispatch(buySubscription())
    }

    useEffect(() => {
        if (courseError) {
            toast.error(courseError)
            dispatch({ type: 'clearError' })
        }
        if (error) {
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if (subscriptionId) {
            const openPopUp = () => {
                const options = {
                    key,
                    name: "Unacademy",
                    description: "Get Access to the Premium Content",
                    image: logo,
                    subscription_id: subscriptionId,
                    callback_url: `${server}/payment-verification`,
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: 8534049294
                    },
                    notes: {
                        address: 'Unacademy ,Ground Floor,Noida Main building'
                    },
                    theme: {
                        color: '#805AD5'
                    }
                }
                const razor = window.Razorpay(options)
                razor.open()
            }
            openPopUp()
        }

    }, [courseError, dispatch, error, key, subscriptionId, user.email, user.name])



    return (
        <Box
            mt={2}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius={'xl'}
        >
            <Box py={4} px={8}>
                {
                    isPopular
                        ? (
                            <>
                                <Box position="relative">
                                    <Box
                                        position="absolute"
                                        top="-30px"
                                        left="50%"
                                        style={{ transform: 'translate(-50%)' }}
                                    >
                                        <Text
                                            textTransform="uppercase"
                                            bg={'purple.500'}
                                            boxShadow={'lg'}
                                            width={'200px'}
                                            py={1}
                                            color={['white', 'white']}
                                            fontSize="sm"
                                            fontWeight="300"
                                            rounded="14px"
                                        >
                                            Most Popular
                                        </Text>
                                    </Box>
                                </Box>
                            </>
                        )
                        : (
                            <>
                            </>
                        )
                }
                <Heading as="h2" fontSize="2xl" children={title} className='defaultFontFamily' mt={2} />
                <HStack justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600" children={"$"} />
                    <Text fontSize="5xl" fontWeight="900" children={price} />
                    <Text fontSize="3xl" color="gray.500" children={"/Month"} />
                </HStack>
            </Box>
            <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
            >
                <List spacing={3} textAlign="start" px={4}>
                    {features.map((feature, index) => (
                        <ListItem key={index}>
                            <ListIcon as={FaCheckCircle} color="#00C851" />
                            {feature}
                        </ListItem>
                    ))}
                </List>
                {
                    isPopular
                        ?
                        (<Box w="80%" pt={7}>
                            <Button
                                isLoading={loading}
                                w="full"
                                color="#fff"
                                backgroundColor={'#ff4444'}
                                variant="outline"
                                _hover={{
                                    backgroundColor: 'gray'
                                }}
                                fontWeight={300}
                                onClick={subscribeHandler}
                            >
                                Subscribe
                            </Button>
                        </Box>)
                        : (<Box w="80%" pt={7}>
                            <Button
                                w="full"
                                color="#ff4444"
                                borderColor={'#ff4444'}
                                variant="outline"
                                fontWeight={300}
                                onClick={() => {
                                    toast.success("This is Not Implement Yet Please Subscribe Most Popular Plan", {
                                        duration: 5000
                                    })
                                    // alert('This is Not Implement Yet Please Subscribe Most Popular Plan')
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>)
                }
            </VStack>
        </Box >
    );
}



const Subscribe = ({ user }) => {


    return (
        <Box marginTop={10}>
            <VStack spacing={2} textAlign="center">
                <Heading
                    as="h1"
                    fontSize="4xl"
                    className='defaultFontFamily'
                    marginTop={['40px', '5px']}
                    children="Plans that Fit your need"
                />
            </VStack>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
                paddingTop={10}
            >
                {Plans.map((plan, index) => (
                    <PriceWrapper
                        key={index}
                        title={plan.title}
                        price={plan.price}
                        features={plan.features}
                        isPopular={plan.isPopular}
                        user={user}
                    />
                ))}
            </Stack>
        </Box>
    );
}

export default Subscribe