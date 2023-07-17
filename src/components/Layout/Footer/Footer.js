import {
    Box,
    chakra,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
    Image,
} from "@chakra-ui/react"
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa"
import { BiMailSend } from "react-icons/bi"


import FooterLogo from './../../../assets/images/UnacademyLogo.png'



const SocialButton = ({ children, label, href }) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
            }}
            target={'blank'} rel="noreferrer"
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
            {children}
        </Text>
    )
}

const Footer = () => {
    return (
        <Box
            maxH={'10vh'}
            marginTop={20}
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Container as={Stack} maxW={"6xl"} py={10}>
                <SimpleGrid
                    templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
                    // templateColumns={{ sm: "repeat(auto-fit, minmax(0, 1fr))", md: "repeat(auto-fit, minmax(0, 1fr))" }}
                    spacing={8}
                >
                    <Stack spacing={6}>
                        <Box>
                            <Image width={190} height={"auto"} src={FooterLogo} alt="Footer Logo" />
                        </Box>
                        <Box display={"flex"} gap={3}>
                            <Image width={120} src="https://freelogopng.com/images/all_img/1664287128google-play-store-logo-png.png" />
                            <Image width={120} src="https://www.pngkey.com/png/full/717-7172586_app-store-badge-png.png" />

                        </Box>

                        <Text fontSize={"sm"}>
                            <p> © 2022 Unacademy Private Ltd.</p>
                            <p>All rights reserved</p>
                        </Text>
                        <Stack direction={"row"} spacing={6}>
                            <SocialButton
                                label={"Linkedin"}
                                href={"https://www.linkedin.com/in/RahulB001"}
                            >
                                <FaLinkedin />
                            </SocialButton>
                            <SocialButton
                                label={"Github"}
                                href={"https://github.com/RahulBisht001"}
                            >
                                <FaGithub />
                            </SocialButton>
                            <SocialButton label={"Twitter"} href={"#"}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={"YouTube"} href={"#"}>
                                <FaYoutube />
                            </SocialButton>
                        </Stack>
                    </Stack>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Stack align={"flex-start"}>
                            <ListHeader>Company</ListHeader>
                            <Link href={"/about"} _hover={{ color: "purple.600" }}>About us</Link>
                            <Link href={"/blog"} _hover={{ color: "purple.600" }}>Blog</Link>
                            <Link href={"/contact"} _hover={{ color: "purple.600" }}>Contact us</Link>
                            <Link href={"/subscribe"} _hover={{ color: "purple.600" }}>Pricing</Link>
                            <Link href={"/testimonials"} _hover={{ color: "purple.600" }}>Testimonials</Link>
                        </Stack>
                        <Stack align={"flex-start"}>
                            <ListHeader>Support</ListHeader>
                            <Link href={"/help"} _hover={{ color: "purple.600" }}>Help Center</Link>
                            <Link href={"/terms"} _hover={{ color: "purple.600" }}>Terms of Service</Link>
                            <Link href={"/legal"} _hover={{ color: "purple.600" }}>Legal</Link>
                            <Link href={"/privacy/policy"} _hover={{ color: "purple.600" }}>Privacy Policy</Link>
                            <Link href={"/status"} _hover={{ color: "purple.600" }}>Status</Link>
                        </Stack>
                    </Box>

                    <Stack align={"flex-start"}>
                        <ListHeader>Subscribe to our Newsletter</ListHeader>
                        <Stack direction={"row"}>
                            <Input
                                placeholder={"Your email address"}
                                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                                border={0}
                                _focus={{
                                    bg: "whiteAlpha.300"
                                }}
                                width={'280px'}
                                fontWeight={'100'}
                            />
                            <IconButton
                                bg={useColorModeValue("purple.400", "purple.800")}
                                color={useColorModeValue("white", "gray.600")}
                                _hover={{
                                    bg: "purple.600"
                                }}
                                aria-label="Subscribe"
                                icon={<BiMailSend />}
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    )
}
export default Footer



//* Old Footer Bad -----------------------------------------

/*
import React from 'react'

import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'

import {
    Instagram,
    LinkedIn,
    GitHub,
    YouTube,
    WhatsApp,
} from '@mui/icons-material';


const Footer = () => {
    return (
        <>
            <Box padding={4} bg={'black'} minH={'10vh'} >

                <Stack direction={['column', 'row']}>
                    <VStack alignItems={['center', 'flex-start']} width={'full'} >

                        <Heading size='md' children="All Rights Reserved" color={'white'} className='defaultFontFamily' />
                        <Heading size='sm' children="Rahul B" color={'purple.600'} className='defaultFontFamily' />
                    </VStack>

                    <HStack spacing={['2', '10']} justifyContent={'center'} color={'white'} >
                        <a
                            href="https://www.linkedin.com/in/RahulB001/"
                            target={'_blank'} rel="noreferrer">
                            <LinkedIn />
                        </a>

                        <a
                            href="https://github.com/RahulBisht001"
                            target={'_blank'} rel="noreferrer">
                            <GitHub />
                        </a>

                        <a
                            href="https://www.instagram.com/_rb__99/"
                            target={'_blank'} rel="noreferrer"
                        >
                            <Instagram />
                        </a>

                        <a
                            href="https://youtube.com"
                            target={'_blank'} rel="noreferrer"
                        >
                            <YouTube />
                        </a>

                        <a
                            href="8534049294" target={'_blank'} rel="noreferrer">
                            <WhatsApp />
                        </a>

                    </HStack>
                </Stack>
            </Box>
        </>
    )
}

export default Footer
*/
