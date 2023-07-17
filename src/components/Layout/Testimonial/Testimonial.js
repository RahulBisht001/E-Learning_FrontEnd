import React from 'react';
import {
    Box, Flex, Heading, Text, Stack,
    Container, Avatar, useColorModeValue,
} from '@chakra-ui/react';


const TestimonialWrapper = ({ heading, testimonialText, src, name, title }) => {
    return (
        <>
            <Box width={['100%', '25%']}>
                <Stack
                    bg={useColorModeValue('gray.100', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    rounded={'xl'}
                    align={'center'}
                    pos={'relative'}
                    _after={{
                        content: `""`,
                        w: 0,
                        h: 0,
                        borderLeft: 'solid transparent',
                        borderLeftWidth: 16,
                        borderRight: 'solid transparent',
                        borderRightWidth: 16,
                        borderTop: 'solid',
                        borderTopWidth: 16,
                        borderTopColor: useColorModeValue('gray.100', 'gray.700'),
                        pos: 'absolute',
                        bottom: '-16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}>
                    <Heading as={'h3'} fontSize={'xl'} className='defaultFontFamily' textAlign={'center'}>
                        {heading}
                    </Heading>
                    <Text
                        textAlign={'center'}
                        color={useColorModeValue('gray.600', 'gray.400')}
                        fontSize={'sm'}>
                        {testimonialText}
                    </Text>
                </Stack>
                <Flex align={'center'} mt={8} direction={'column'}>
                    <Avatar src={src} alt={name} mb={2} />
                    <Stack spacing={-1} align={'center'}>
                        <Text fontWeight={600}>{name}</Text>
                        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
                            {title}
                        </Text>
                    </Stack>
                </Flex>
            </Box>
        </>
    )
}

const Testimonial = () => {

    const testimonials = [
        {
            heading: "Efficient Collaborating Environment",
            testimonialText: "Improved collaboration skills. Interactive features and group projects made working with others efficient.",
            src: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            name: 'John Doe',
            title: 'Frontend Developer at Meta'
        },
        {
            heading: "Interactive Learning Experience",
            testimonialText: "Incredible interactive learning experience. Engaging lessons and quizzes. Highly recommended! Must Try",
            src: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            name: 'Jane Smith',
            title: 'Student at XYZ University'
        },
        {
            heading: "Flexible Learning Schedule",
            testimonialText: "Flexible schedule is a game-changer. Learn at your own pace. Perfect for work-life balance.Thanks to Unacademy",
            src: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            name: 'David Johnson',
            title: 'Marketing Professional'
        },
        {
            heading: "Extensive Course Selection",
            testimonialText: "Thanks Unacademy for Extensive course selection, Top-notch courses and instructors. Glad I discovered this platform early!  ",
            src: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            name: 'Sophia Anderson',
            title: 'Lifelong Learner'
        }
    ]

    return (
        <Box >
            <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
                <Stack spacing={0} align={'center'}>
                    <Heading
                        className='defaultFontFamily'
                        fontSize={['25px', '35px']}
                        color={'blackAlpha.800'}
                    >
                        Unacdemians Said
                    </Heading>
                    <Text>Our Students are All over the world</Text>
                </Stack>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 10, md: 4, lg: 10 }}>

                    {
                        testimonials.map((item, idx) => (
                            <TestimonialWrapper
                                key={idx}
                                heading={item.heading}
                                testimonialText={item.testimonialText}
                                src={item.src}
                                name={item.name}
                                title={item.title}
                            />
                        ))
                    }

                </Stack>
            </Container>
        </Box>
    );
}

export default Testimonial