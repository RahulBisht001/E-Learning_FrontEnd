import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
    Box, Button, Container, HStack,
    Heading, Image, Input, Stack, Text, VStack
} from '@chakra-ui/react'

import categories from '../../constants/Categories'

import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/actions/course'
import { addToPlaylist } from '../../redux/actions/profile'

import toast from 'react-hot-toast'

import NoCourses from './NoCourses'
// import { getMyProfile } from '../../redux/actions/user'

const CourseComponent = ({ views, title, imageSrc,
    id, addToPlaylistHandler, creator, description,
    lectureCount, loading }) => {

    return (
        <>
            <VStack
                className='course'
                alignItems={['center', 'flex-start']}
                px={2}
                boxShadow='lg'

            >
                <Image src={imageSrc} boxSize={60} objectFit={'contain'} className='courseImgHover' />
                <Box>
                    <Heading
                        textAlign={'center'}
                        maxW={240}
                        size={'sm'}
                        noOfLines={3}
                        children={title}
                        className='defaultFontFamily'
                    />
                    <Text
                        children={description}
                        maxW={240}
                        fontSize={'14px'}
                        textAlign={'center'}
                        noOfLines={2}
                    />
                    <HStack width={'100%'} maxW={240} display={'flex'} justifyContent={'space-between'} >

                        <Text children='Creator :' fontWeight={'bold'} textDecor="underline" mb={2} />
                        <Text children={creator} noOfLines={1} textDecor="underline" mb={2} />

                    </HStack>

                    <HStack width={'100%'} maxW={240} display={'flex'} justifyContent={'space-between'} >
                        <Heading size={'xs'} textAlign={'center'} children={`Total Lectures : ${lectureCount}`} />
                        <Heading size={'xs'} textAlign={'center'} children={`Purchases : ${views}`} />
                    </HStack>

                    <Stack alignItems={'center'} direction={['column,row']} my={2}>
                        <Link to={`/course/${id}`} >
                            <Button rounded={0} fontWeight={100} size={'sm'} variant={'ghost'} colorScheme='purple'>
                                Go To Course
                            </Button>
                        </Link>

                        <Button
                            rounded={0}
                            size={'sm'}
                            fontWeight={100}
                            colorScheme='purple'
                            isLoading={loading}
                            onClick={() => addToPlaylistHandler(id)}
                        >
                            Add to PlayList
                        </Button>
                    </Stack>
                </Box>
            </VStack>

        </>
    )
}



const Courses = () => {

    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState('')

    const dispatch = useDispatch()
    const { courses, error, message } = useSelector((state) => state.course)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: 'clearMessage' })
        }
        dispatch(getAllCourses(category, keyword))

    }, [category, dispatch, error, keyword, message])

    const addToPlaylistHandler = async (courseId) => {
        // console.log('Added Successfully', courseId)
        dispatch(addToPlaylist(courseId))
            .then(() => {
                // dispatch(getMyProfile())
            })
    }




    return (
        <>
            <Container
                maxW={'container.lg'}
                paddingY={'10'}
            >
                <Box display={'flex'}
                    alignItems={'center'}
                    marginY={'20px'}
                    marginX={'3%'}
                >
                    <Image
                        src="https://static.uacdn.net/production/_next/static/icons/icon-384x384.png"
                        width={['40px', "60px"]}
                        height={'50px'}
                        objectFit="cover"
                        alt=""
                    />
                    <Heading
                        children="All Courses"
                        className='defaultFontFamily'
                        size={'lg'}
                    />
                </Box>

                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Search For A Course . . .'
                    type='text'
                    mx={['5', '8']}
                    rounded={0}
                    width={'90%'}
                    border={'none'}
                    borderBottom={'2px'}
                    borderColor={'purple.600'}
                    focusBorderColor='purple.600'
                />

            </Container >

            <Container
                minH={'95vh'}
                maxW={'container.xl'}
            // paddingY={'10'}
            >


                <HStack
                    m={['5', '8']}
                    overflowX='auto'
                    // paddingY={'8'}

                    css={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >

                    {
                        categories.map((item, idx) => (
                            <Button key={idx} minW={60} onClick={() => setCategory(item)} >
                                <Text children={item} />
                            </Button>
                        ))
                    }

                </HStack>

                <Stack
                    direction={['column', 'row']}
                    flexWrap={'wrap'}
                    justifyContent={['flex-start', 'space-evenly']}
                    alignItems={['center', 'flex-start']}
                    spacing={5}
                >
                    {/* //! Component for Individual Courses */}
                    {
                        courses.length > 0
                            ?
                            (courses.map((item) => (
                                <CourseComponent
                                    key={item._id}
                                    title={item.title}
                                    description={item.description}
                                    views={item.views}
                                    imageSrc={item.poster.url}
                                    id={item._id}
                                    creator={item.createdBy}
                                    lectureCount={item.numOfVideos}
                                    addToPlaylistHandler={addToPlaylistHandler}
                                    // loading={loading}
                                />
                            )))
                            : (
                                <>
                                    <NoCourses />
                                </>
                            )
                    }

                </Stack>

            </Container>
        </>
    )
}

export default Courses