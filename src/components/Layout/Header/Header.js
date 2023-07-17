import React from 'react'

// import { ColorModeSwitcher } from '../../../ColorModeSwitcher'
import { Flex, HStack, Image, Text } from '@chakra-ui/react'
import {
    Button, Drawer, DrawerBody, DrawerContent,
    DrawerHeader, DrawerOverlay, VStack, useDisclosure
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'


import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'


import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'

import Logo from './../../../assets/images/UnacademyLogo.png'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/user'


const iconMap = {
    1: HomeOutlinedIcon,
    2: MenuBookOutlinedIcon,
    3: HeadsetMicOutlinedIcon,
    4: CallOutlinedIcon,
    5: InfoOutlinedIcon,
};



const LinkButtons = ({ url = '/', title = 'Home', idx, onClose }) => {

    const SelectedIcon = iconMap[idx] || null

    return (

        <Link to={url} className='defaultSideBar' onClick={onClose}>
            <Flex align="center">
                {SelectedIcon && <SelectedIcon />}
                <Button variant="ghost">{title}</Button>
            </Flex>
        </Link>
    )
}


const Header = ({ isAuthenticated = false, user }) => {

    const { isOpen, onClose, onOpen } = useDisclosure()

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        onClose()
    }


    return (
        <>
            {/* <ColorModeSwitcher /> */}

            <Button
                onClick={onOpen}
                colorScheme='gray'
                position={'fixed'}
                top={4}
                left={6}
                zIndex={'overlay'}
            >
                <DensityMediumOutlinedIcon fontSize='sm' />
            </Button>

            <Drawer
                variant="secondary"
                placement='left'
                onClose={onClose}
                isOpen={isOpen}
            >
                <DrawerOverlay backdropFilter={'blur(3px)'} />
                <DrawerContent>
                    <DrawerHeader
                        borderBottomWidth={'1px'}
                    >
                        <Image src={Logo}
                            width={['150px', '180px']}
                            height={'auto'}
                            objectFit='cover'
                            alt='Unacademy Logo'
                        />
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack
                            spacing={4}
                            alignItems={'flex-start'}
                        >

                            <LinkButtons url="/" title="Back To Home" idx={1} onClose={onClose} />
                            <LinkButtons url="/courses" title="Browse Courses" idx={2} onClose={onClose} />
                            <LinkButtons url="/request" title="Request a Course" idx={3} onClose={onClose} />
                            <LinkButtons url="/contact-us" title="Contact Us" idx={4} onClose={onClose} />
                            <LinkButtons url="/about" title="About &nbsp; &nbsp;" idx={5} onClose={onClose} />

                            <HStack
                                justifyContent={'space-evenly'}
                                position={'absolute'}
                                bottom={'2rem'}
                                width={'80%'}
                            >
                                {
                                    isAuthenticated
                                        ? (<>
                                            <VStack>
                                                <HStack>
                                                    <Link onClick={onClose} to={'/profile'}>
                                                        <Button
                                                            colorScheme='whatsapp'
                                                            className='defaultSideBar'
                                                            variant={'ghost'}
                                                        >
                                                            <PermIdentityOutlinedIcon />
                                                            &nbsp; My Profile
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        colorScheme='facebook'
                                                        onClick={logoutHandler}
                                                        className='defaultSideBar'
                                                        variant={'ghost'}
                                                    >
                                                        <LogoutOutlinedIcon />
                                                        &nbsp; Log out
                                                    </Button>
                                                </HStack>

                                                {
                                                    user && user.role === 'admin'
                                                    && (
                                                        <Link
                                                            onClick={onClose}
                                                            to='/admin/dashboard'
                                                        >

                                                            <Button
                                                                colorScheme='purple'
                                                                variant={'ghost'}
                                                                // paddingY={'30px'}
                                                                marginTop={'10px'}
                                                                className='defaultSideBar'
                                                            >
                                                                <GridViewOutlinedIcon />
                                                                &nbsp; Admin DashBoard
                                                            </Button>
                                                        </Link>
                                                    )}
                                            </VStack>
                                        </>)
                                        : (<>
                                            <Link
                                                to={'/login'}
                                                onClick={onClose}
                                            >
                                                <Button
                                                    variant={'outline'}
                                                    colorScheme='whatsapp'
                                                    className='defaultSideBar'
                                                >
                                                    &nbsp;&nbsp;Login&nbsp;
                                                </Button>
                                            </Link>
                                            <Text className='defaultFontFamily' fontWeight={'bold'}>
                                                OR
                                            </Text>

                                            <Link
                                                onClick={onClose}
                                                to={'/register'}
                                            >
                                                <Button
                                                    variant={'outline'}
                                                    colorScheme='twitter'
                                                    className='defaultSideBar'
                                                >
                                                    &nbsp;Register&nbsp;
                                                </Button>
                                            </Link>
                                        </>)
                                }
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header

