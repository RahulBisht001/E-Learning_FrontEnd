import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

import { Link } from 'react-router-dom'


import notFoundGif from '../../../assets/images/NotFound.gif'



const NotFound = () => {
    return (
        <>
            <Box className='container' p={4}>
                <Box
                    bgImage={`url(${notFoundGif})`}
                    height="400px"
                    backgroundPosition="center"
                >
                    <Heading
                        as="h1"
                        fontSize={['50', '70']}
                        textAlign="center"
                        className='defaultFontFamily'
                    >
                        404
                    </Heading>
                </Box>
                <Box
                    mt={-50}
                >
                    <Heading
                        as="h3"
                        fontSize={['30', '60']}
                        className='defaultFontFamily'
                    >
                        Look like you're lost
                    </Heading>
                    <Text>
                        The page you are looking for is not available!
                    </Text>
                    <Box display={'flex'} justifyContent={'center'} mt={5}>
                        <Link to={'/'}>
                            <Button colorScheme='purple' fontWeight={300}>
                                &nbsp; Go To Home &nbsp;
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box >
        </>
    );
};

export default NotFound;
