import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
    Avatar, Box, Button, Container, Divider,
    HStack, Heading, Image, Input, Modal,
    ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Stack,
    Text, VStack, useDisclosure
} from '@chakra-ui/react'



import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import DeleteIcon from '@mui/icons-material/Delete';
import { fileUploadCss } from '../Auth/Register'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import { cancelSubscription, getMyProfile } from '../../redux/actions/user'
import { toast } from 'react-hot-toast'


const Profile = ({ user }) => {

    const { isOpen, onClose, onOpen } = useDisclosure()
    const dispatch = useDispatch()
    const { message, error, loading } = useSelector((state) => state.profile)
    const { message: subscriptionMessage,
        error: subscriptionError,
        loading: subscriptionLoading } = useSelector((state) => state.subscription)



    const removeFromPlaylistHandler = async (id) => {

        await dispatch(removeFromPlaylist(id))
        dispatch(getMyProfile())
    }


    const changeImageSubmitHandler = async (e, img) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.append('file', img)
        dispatch(updateProfilePicture(myForm)).then(() => {
            dispatch(getMyProfile());
            onClose();
        })
    }

    const cancelSubscriptionHandler = () => {

        dispatch(cancelSubscription())
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
        if (subscriptionError) {
            toast.error(subscriptionError);
            dispatch({
                type: "clearError"
            })
        }
        if (subscriptionMessage) {
            toast.success(subscriptionMessage);
            dispatch({
                type: "clearMessage"
            })
            setTimeout(() => {
                dispatch(getMyProfile())
            }, 1500)
        }

    }, [dispatch, error, message, subscriptionError, subscriptionMessage])

    console.log(user.playlist)

    return (
        <>
            <Container maxW={'container.lg'} py={'8'}>
                <Heading
                    children="My Profile"
                    my={'8'}
                    className='defaultFontFamily'
                    textAlign={'center'}
                />

                <Stack
                    justifyContent={'flex-start'}
                    direction={['column', 'row']}
                    alignItems={'center'}
                    my={'8'}
                    spacing={['8', '16']}
                >

                    <VStack>
                        <Avatar boxSize={'32'} src={user && user.avatar && user.avatar.url} />
                        <Button
                            colorScheme='purple'
                            variant={'ghost'}
                            fontWeight={300}
                            onClick={onOpen}
                        >
                            Change Profile Pic
                        </Button>
                    </VStack>

                    <VStack alignItems={['center', 'flex-start']}>
                        <HStack width={'100%'}>
                            <Text children="Name &nbsp;" fontWeight={600} />
                            <Text children={user.name} fontWeight={300} />
                        </HStack>

                        <HStack width={'100%'}>
                            <Text children="Email &nbsp;" fontWeight={600} />
                            <Text children={user.email} fontWeight={300} />
                        </HStack>

                        <HStack width={'100%'}>
                            <Text children="Joined on" fontWeight={600} />
                            <Text children={user.createdAt.split("T")[0]} fontWeight={300} />
                        </HStack>

                        {user.role !== 'Admin' && (
                            <HStack marginTop={'5'} width={'100%'}>
                                <Text children="Subscription" fontWeight={600} />
                                {user.subscription && user.subscription.status === 'active' ? (
                                    <Button
                                        size={'sm'}
                                        style={{
                                            backgroundColor: '#FF4444',
                                            color: '#fff',
                                            fontWeight: 300
                                        }}
                                        onClick={cancelSubscriptionHandler}
                                        isLoading={subscriptionLoading}
                                    >
                                        Cancel Subscription
                                    </Button>
                                ) : (
                                    <Link to={'/subscribe'}>
                                        <Button
                                            size={'sm'}
                                            style={{
                                                backgroundColor: '#00C851',
                                                color: '#fff',
                                                fontWeight: 300
                                            }}>
                                            Subscribe
                                        </Button>
                                    </Link>
                                )}
                            </HStack>
                        )}

                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            marginTop={8}
                        >
                            <Link to={'/update-profile'}>
                                <Button
                                    size={'sm'}
                                    style={{
                                        fontWeight: 300
                                    }}
                                >
                                    Update Profile
                                </Button>
                            </Link>

                            <Link to={'/change-password'} >
                                <Button
                                    size={'sm'}
                                    style={{
                                        fontWeight: 300
                                    }}
                                >
                                    Change Password
                                </Button>
                            </Link>
                        </Stack>
                    </VStack>
                </Stack>

                <br />
                <Divider />
                <br />

                <Box display={'flex'}>
                    <Heading
                        children="My Playlist&nbsp;"
                        className='defaultFontFamily'
                        size={'md'}
                        marginBottom={'10'}
                    />
                    <PlaylistAddIcon />
                </Box>

                {
                    user && user.playlist && user.playlist.length > 0 && (
                        <Stack
                            direction={['column', 'row']}
                            alignItems={['flex-start', 'center']}
                        >
                            {
                                user.playlist.map((item) => (

                                    <Stack
                                        w={['80', '48']}
                                        key={item.course}
                                        flexDirection={['row', 'column']}
                                        // justifyContent={'space-between'}
                                        marginBottom={'10px'}
                                        marginRight={['2px', '20px']}
                                    >
                                        <Image
                                            src={item.poster}
                                            boxSize={['150px', 'full']}
                                            height={'auto'}
                                            objectFit={'contain'}
                                        />

                                        <Stack justifyContent={'space-between'} width={'full'}>
                                            <Text
                                                textAlign={item.title.length <= 10 ? 'center' : 'flex-start'}
                                                noOfLines={item.title.length > 10 ? [2, 1] : undefined}
                                                fontSize={['14px', '16px']}
                                            >
                                                {item.title}
                                            </Text>
                                            <Box display="flex" justifyContent="space-between" alignItems={'center'}>
                                                <Link
                                                    to={`/course/${item.course}`}
                                                >
                                                    <Button width={['auto', '40']} size={['xs', 'sm']} fontSize={'12px'}>
                                                        Watch Now
                                                    </Button>
                                                </Link>
                                                <button
                                                    isLoading={loading}
                                                    onClick={() => removeFromPlaylistHandler(item.course)}
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    )
                }
                {/* //* Modal for updating the avatar */}
                <ChangePhotoBox
                    isOpen={isOpen}
                    onClose={onClose}
                    changeImageSubmitHandler={changeImageSubmitHandler}
                    loading={loading}
                />
            </Container>
        </>
    )
}

export default Profile



function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler, loading }) {

    //? _____________________________________________________________________

    const [imgPreview, setImgPreview] = useState('')
    const [img, setImg] = useState('')

    const changeImageHandler = async (e) => {
        const file = await e.target.files[0]
        console.log("Your Files Object")
        console.log(file)

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImgPreview(reader.result)
            console.log(imgPreview)
            setImg(file)
            console.log(img)
        }
    }
    //? _____________________________________________________________________

    const closeModalHandler = async () => {
        await onClose();
        setImg('');
        setImgPreview('');
    }


    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModalHandler}
            >
                <ModalOverlay backdropFilter={'blur(10px)'} />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader
                        display={'flex'}
                        justifyContent={'center'}
                        className='defaultFontFamily'
                    >
                        Change Avatar
                    </ModalHeader>
                    <ModalBody>
                        <Container>
                            <form onSubmit={(e) => changeImageSubmitHandler(e, img)}>
                                <VStack>
                                    {
                                        imgPreview &&
                                        <Avatar src={imgPreview} boxSize={'36'} />
                                    }

                                    {/* //? This fileUpload css is already written in a component we are just importing it */}
                                    <Input
                                        type='file'
                                        css={{ "&::file-selector-button": fileUploadCss }}
                                        onChange={changeImageHandler}
                                        className='defaultFontFamily'
                                    />

                                    <Button
                                        w={'full'}
                                        colorScheme='purple'
                                        type='submit'
                                        className='defaultFontFamily'
                                        fontWeight={300}
                                        isLoading={loading}
                                    >
                                        Change Avatar
                                    </Button>
                                </VStack>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr={'3'}
                            onClick={closeModalHandler}
                            className='defaultFontFamily'
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}