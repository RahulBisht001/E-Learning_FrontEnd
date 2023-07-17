import React from 'react'
import { Link } from 'react-router-dom'

import {
    Avatar, Box, Button, Container,
    Divider,
    HStack, Heading, Image, Stack, Text, VStack
} from '@chakra-ui/react'



import Co_Founder_Img from './../../assets/images/RahulB.png'
import Question_Mark_Img from './../../assets/images/QuestionMark.png'
import Razorpay_Logo from '../../assets/images/Razorpay_logo.svg'

import ThemeVideo from './../../assets/video/ThemeVideo.mp4'

// * __________________________

import PrivacyPolicy from './PrivacyPolicy'



const Founder = () => {
    return (
        <Stack
            direction={['column', 'row']}
            m={0}
            spacing={['4', '16']}
        >
            <VStack>
                <Avatar src={Co_Founder_Img} boxSize={['32', '40']} />
                <Text children="Co-Founder & CEO" opacity={0.7} />
            </VStack>

            <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
                <Heading children="Rahul B" size={['md', 'xl']} className='defaultFontFamily' />
                <Text opacity={0.7} alignItems={['center', 'left']} textAlign={['center', 'left']}>
                    Hi ! I am Rahul,Co-Founder and CEO of Unacademy. The platform for the next billion students
                    Transforming tech education for the next generation of developers.
                </Text>
            </VStack>

        </Stack>
    )
}


const VideoPlayer = () => {
    return (
        <>
            <Box>
                <video
                    controls
                    controlsList='nodownload nofullscreen noremoteplayback'
                    muted
                    loop
                    disablePictureInPicture
                    disableRemotePlayback
                    src={ThemeVideo}
                >
                </video>
            </Box>
        </>
    )
}


const TermsAndCondition = () => {
    return (
        <>
            <Box>
                <Heading
                    size={'sm'}
                    my={5}
                    children="Terms and Conditions"
                    className='defaultFontFamily'
                    textAlign={['center', 'left']}
                />
                <Divider />
                <Box h={'xs'} my={4} overflowY={'scroll'} className='scrollbar'>
                    <PrivacyPolicy />
                </Box>

                <Heading
                    size={'xs'}
                    my={5}
                    children="Terms and Conditions"
                    className='defaultFontFamily'
                    textAlign={['center', 'left']}
                >Refund only Applicable for cancellation within 10 days</Heading>
            </Box>
        </>
    )
}



const About = () => {
    return (
        <>
            <Container
                maxW={'container.lg'}
                boxShadow={'lg'}
                marginTop={['24', '16']}
                width={['90%', '100%']}
                padding={['5', '12']}
                rounded={'xl'}
                className='defaultFontFamily'
            >

                <Heading
                    children="About Us"
                    textAlign={['center', 'left']}
                    className='defaultFontFamily'
                    marginBottom={['4', '8']}
                />
                {/* //? this is component which is used here only */}
                <Founder />

                < Heading
                    marginTop={['10', '14']}
                    marginBottom={['3', '4']}
                    children="What we offer ?"
                    className='defaultFontFamily'
                    fontSize={['18', '22']}
                    textAlign={'center'}
                />
                <Box display={'flex'} justifyContent={'center'} m={[2, 0]}>
                    <Image src={Question_Mark_Img} boxSize={[120, 180]} />
                </Box>
                <Stack
                    direction={['column', 'row']}
                    m={'2'}
                    alignItems={'center'}
                >
                    <Text
                        textAlign={['center', 'center']}
                    >
                        Unacademy partners with more than 275 leading universities and companies to bring flexible,
                        affordable, job-relevant online learning to individuals and organizations worldwide.
                        We offer a range of learning opportunities—from hands-on projects and courses to job-ready
                        certificates and degree programs.

                        Whether you want to learn or to share what you know, you've come to the right place.
                        We believe
                        Learning is the source of human progress.
                    </Text>

                </Stack>
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <Link to={'/subscribe'}>
                        <Button
                            variant={'ghost'}
                            colorScheme='purple'
                            fontSize={['14', '16']}
                            style={{
                                fontWeight: 400,
                                textDecoration: 'underline',
                            }}>
                            Check Out a Plan
                        </Button>
                    </Link>
                </Box>

                {/* //? this is component which is used here only */}
                <VideoPlayer />

                {/* //? this is component which is used here only */}
                <TermsAndCondition />

                <Divider />

                <a href="https://razorpay.com/" target='_blank' rel="noreferrer">
                    <img
                        src={Razorpay_Logo}
                        alt='Razorpay logo'
                        width={'90px'}
                        height={'auto'}
                        style={{
                            marginTop: '50px'
                        }}
                    />
                </a>

                <HStack style={{
                    padding: '10px 0px'
                }} >
                    <Heading
                        children="Payment is secured by Razorpay"
                        size={'xs'}
                        className='defaultFontFamily'
                    />
                </HStack>

            </Container >
        </>
    )
}

export default About