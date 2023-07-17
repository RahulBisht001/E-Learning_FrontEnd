import React from 'react'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'


import './Payment.css'
import { Link } from 'react-router-dom';


const PaymentFail = () => {
    return (
        <>

            <Container p={[4, 2]} marginTop={['80px', '50px']}>
                <Heading
                    children="Payment Failed"
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
                        class="checkmark error"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                    >
                        <circle
                            class="checkmark_circle_error"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                        />
                        <path
                            class="checkmark_check"
                            stroke-linecap="round"
                            fill="none"
                            d="M16 16 36 36 M36 16 16 36"
                        />
                    </svg>

                    <VStack marginTop={4}>
                        <Link to={'/subscribe'}>
                            <Button colorScheme='purple' fontWeight={300}>
                                Try Again
                            </Button>
                        </Link>
                    </VStack>
                </VStack>
            </Container>
        </>
    );
};

export default PaymentFail;
