import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react'


import './Payment.css'
import Congrats from './Congrats'


const PaymentSuccess = () => {

    const referenceID = useSearchParams()[0].get('reference')

    return (
        <>
            {/* //? This component generate congratulation flairs */}
            <Congrats />

            <Container p={[4, 2]} marginTop={['80px', '50px']}>
                <Heading
                    children="Payment Successful"
                    className="defaultFontFamily"
                    textAlign={'center'}
                    my={4}
                />
                <VStack
                    boxShadow={'lg'}
                    pb={16}
                    alignItems={'center'}
                    borderRadius={'lg'}
                >
                    {/* 
                    //! I Copied this Payment Successful animation from code-pen although
                    //! I am Understanding it and then implement it but still copied is copied
                    */}

                    <svg
                        class="checkmark success"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                    >
                        <circle
                            class="checkmark_circle_success"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                        />
                        <path
                            class="checkmark_check"
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            stroke-linecap="round"
                        />
                    </svg>

                    <VStack textAlign={'center'} p={4}>
                        <Text children=" Congratulations! Your Payment was Successful." />
                        <Text children="Now you can access the Premium Courses." />
                    </VStack>
                    <Link to={'/profile'}>
                        <Button variant={'ghost'} colorScheme='purple' fontWeight={300}>
                            Go To Profile
                        </Button>
                    </Link>
                    <Heading size={'xs'} className='defaultFontFamily' marginTop={4}>
                        Reference Id :   {referenceID}
                    </Heading>
                </VStack>
            </Container>
        </>
    );
};

export default PaymentSuccess;
