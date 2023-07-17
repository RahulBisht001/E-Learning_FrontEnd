import React from 'react'
import { Link } from 'react-router-dom'


import { Box, Button, Grid, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'


import './Home.css'
import heroImg from './../../assets/images/Hero_Img.webp'

import { brandLogos } from '../../constants/brandLogos'
import Testimonial from '../Layout/Testimonial/Testimonial'

const Home = () => {
    return (
        <section className='home'>
            <Box className="container" padding={['1rem', '5rem']} marginTop={['4rem', '2rem']}>
                <Stack
                    direction={["column", "row"]}
                    height="100%"
                    justifyContent={["center", 'flex-end']}
                    spacing={['16', '24']}
                    alignItems={'center'}
                    paddingX={4}
                >

                    <VStack
                        width={'full'}
                        alignItems={['center', 'flex-end']}
                        spacing={'6'}
                    >
                        <Heading
                            className='defaultFontFamily'
                            children=" Learn From The Experts"
                            textAlign={'center'}
                            size={'2xl'}
                        />
                        <Text
                            className='defaultFontFamily'
                            fontWeight={'600'}
                            textAlign={['center', 'left']}
                            children="Find Valuable Content At Affordable Price"
                        // size={'xl'}
                        />
                        <Link to={'/courses'}
                        >
                            <Button
                                className='defaultFontFamily'
                                size={'lg'}
                                colorScheme='purple'
                            >
                                Explore Now
                            </Button>
                        </Link>
                    </VStack>

                    <Image
                        boxSize={'300px'}
                        src={heroImg}
                        objectFit="contain"
                        className='vector-Animation'
                    />
                </Stack>
            </Box>

            <Testimonial />

            <Box padding={['1.5rem', '3.5rem']} bg={'whiteAlpha.600'} width={'100%'}>
                <Heading
                    textAlign={'center'}
                    children="Our Students Are Placed At"
                    className='defaultFontFamily'
                    fontSize={['25px', '35px']} // Adjusted font size for different screen sizes
                    marginBottom={['50px', '40px']}
                    marginTop={['50px', '0px']}
                    color={'blackAlpha.800'}
                />
                <Grid
                    className='brandBanner'
                    templateColumns={['repeat(auto-fit, minmax(50px, 1fr))', 'repeat(auto-fit, minmax(100px, 1fr))']} // Adjusted column size for different screen sizes
                    gap={[4]} // Adjusted gap size for different screen sizes
                    justifyItems="center"
                >
                    {brandLogos.map((logo) => {
                        return (
                            <Image
                                key={logo.idx}
                                height={['30px', '50px']} // Adjusted height for different screen sizes
                                width={'auto'}
                                margin={2}
                                src={logo.url}
                                objectFit="contain"
                            />
                        );
                    })}
                </Grid>
            </Box>

        </section>
    )
}

export default Home