import { Box, Checkbox, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Logo from '../../assets/images/UnacademyLogo.png'
import Nocourse from '../Courses/NoCourses'

// import Lectures from '../../constants/CourseLectures'
import { getCourseLectures } from '../../redux/actions/course'
import Loader from '../Layout/Loader/Loader'

const CoursePage = ({ user }) => {

    //? This is temporary variable
    const [lectureNumber, setLectureNumber] = useState(0)

    const dispatch = useDispatch()
    const params = useParams()
    const { lectures, loading } = useSelector((state) => state.course)


    useEffect(() => {
        dispatch(getCourseLectures(params.id))
    }, [dispatch, params.id])


    if (user.role !== 'admin' && (user.subscription === undefined
        || user.subscription.status !== 'active')) {

        return <Navigate to={'/subscribe'} />
    }

    return (
        <>
            <Box m={2} marginTop={1}>
                <Image
                    src={Logo}
                    width={['150px', '180px']}
                    height={'auto'}
                    objectFit='cover'
                    alt='Unacademy Logo'
                />
            </Box>
            {
                loading ? (<Loader />) :
                    lectures && lectures.length > 0 ? (
                        <Box
                            m={2}
                            className='videoCss'
                        >
                            <Box width={['100%', '98%']} >
                                <video
                                    controls
                                    controlsList='nodownload noremoteplayback'
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    src={lectures[lectureNumber].video.url}
                                >
                                </video>
                                <Heading
                                    as={'h1'}
                                    size={'lg'}
                                    children={`${lectureNumber + 1}  ${lectures[lectureNumber].title}`}
                                    m={"4"}
                                    className='defaultFontFamily'
                                />

                                <Heading
                                    as='h3'
                                    // size={''}
                                    fontSize={'16px'}
                                    children="Description"
                                    m={"4"}
                                    className='defaultFontFamily'
                                />
                                <Text style={{ wordBreak: 'break-word' }} m={"4"} fontSize={'14px'}>
                                    {lectures[lectureNumber].description}
                                </Text>
                            </Box>
                            <Box>
                                <Heading
                                    as={'h2'}
                                    fontSize='2xl'
                                    className='defaultFontFamily'
                                    fontWeight={600}
                                    marginBottom={'20px'}
                                >
                                    Lectures
                                </Heading>

                                <VStack p={2}>
                                    {
                                        lectures && lectures.map((item, idx) => (
                                            <>
                                                <Divider />
                                                <Box key={idx} display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'flex-start'}>
                                                    <Checkbox size="lg" colorScheme='purple' marginTop={'2px'} />
                                                    <Box width={'100%'} marginLeft={'20px'} >
                                                        <button onClick={() => setLectureNumber(idx)}>
                                                            <Text textAlign={'start'}>
                                                                {item.title}
                                                            </Text>
                                                        </button>
                                                    </Box>
                                                </Box>
                                            </>
                                        ))
                                    }
                                </VStack>
                            </Box>
                        </Box>
                    ) : (
                            <Nocourse />
                        )
            }
        </>
    )
}

export default CoursePage