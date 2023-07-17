import React, { useEffect, useState } from 'react'
import {
    Box, Button, Grid, HStack, Heading,
    Image, Table, TableCaption, TableContainer,
    Tag,
    Tbody, Td, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react'


import Sidebar from '../Sidebar'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import DeleteIcon from '@mui/icons-material/Delete'
import CourseModel from './CourseModel'
import { useDispatch, useSelector } from 'react-redux'

import { getAllCourses, getCourseLectures } from '../../../redux/actions/course'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin'
import { toast } from 'react-hot-toast'


const AdminCourses = () => {

    const dispatch = useDispatch()
    const { courses, lectures, } = useSelector((state) => state.course)
    const { error, message } = useSelector((state) => state.admin)
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [courseID, setCourseID] = useState('')
    const [courseTitle, setCourseTitle] = useState('')


    const [loadingItemId, setLoadingItemId] = useState(null);

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: 'clearMessage' })
        }

        dispatch(getAllCourses())
    }, [dispatch, error, message])

    const courseDetailsHandler = (courseId, title) => {
        setCourseID(courseId)
        setCourseTitle(title)
        setLoadingItemId(courseId)
        dispatch(getCourseLectures(courseId))
        onOpen()
    }

    const deleteCourseHandler = (courseId) => {
        setLoadingItemId(courseId)
        dispatch(deleteCourse(courseId))
    }

    const deleteLectureHandler = async (courseId, lectureId) => {
        setLoadingItemId(courseId)
        await dispatch(deleteLecture(courseId, lectureId))
        dispatch(getCourseLectures(courseId))
    }

    const addNewLectureHandler = async (e, courseId, title, description, video) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.append('title', title)
        myForm.append('description', description)
        myForm.append('file', video)

        await dispatch(addLecture(courseId, myForm))
        dispatch(getCourseLectures(courseId))

    }



    return (
        <>
            <Grid
                minH={'100vh'}
                templateColumns={['1fr', '5fr 1fr']}
            >
                <Box
                    p={['2', '8']}
                    overflowX={'auto'}
                    marginTop={10}
                >
                    <Box
                        display={'flex'}
                        alignItems={'self-start'}
                        mb={10}
                    >
                        <LocalLibraryIcon />
                        <Heading
                            className='defaultFontFamily'
                            textAlign={['center', 'left']}
                            fontSize={'24px'}
                            marginLeft={'10px'}
                        >
                            All Courses
                        </Heading>
                    </Box>

                    <TableContainer width={['100vw', 'full']} className='scrollbar'>
                        <Table
                            variant={'simple'}
                            size={'lg'}
                        >
                            <TableCaption className='defaultFontFamily'>
                                All Available Courses in The DataBase
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th className='defaultFontFamily'>Id</Th>
                                    <Th className='defaultFontFamily'>TiTle</Th>
                                    <Th className='defaultFontFamily'>Poster</Th>
                                    <Th className='defaultFontFamily'>Category</Th>
                                    <Th className='defaultFontFamily'>Creator</Th>
                                    <Th className='defaultFontFamily' isNumeric>Views</Th>
                                    <Th className='defaultFontFamily' isNumeric>Lectures</Th>
                                    <Th className='defaultFontFamily' isNumeric>Action</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {courses.map((item, idx) => (
                                    <Row
                                        key={idx}
                                        item={item}
                                        courseDetailsHandler={courseDetailsHandler}
                                        deleteCourseHandler={deleteCourseHandler}
                                        loadingItemId={loadingItemId}
                                    />
                                ))}
                            </Tbody>

                        </Table>
                    </TableContainer>

                    {/* //! ______ Course Modal for a detail view  __________ */}
                    <CourseModel
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={() => {
                            onClose()
                            setLoadingItemId(null)
                        }}
                        id={courseID}
                        courseTitle={courseTitle}
                        deleteLectureHandler={deleteLectureHandler}
                        addNewLectureHandler={addNewLectureHandler}
                        lectures={lectures}
                        // isLoading={loadingItemId}
                    />

                </Box>
                <Sidebar />
            </Grid>
        </>
    )
}


export default AdminCourses



function Row({ item, courseDetailsHandler, deleteCourseHandler, loadingItemId }) {

    const tagColors = ['blue', 'green', 'orange', 'purple', 'teal',
        'pink', 'yellow', 'red', 'cyan']

    const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)]


    return (
        <>
            <Tr>
                <Td># {item._id}</Td>
                <Td>{item.title}</Td>
                <Td p={'5px'}>
                    <Image src={item.poster.url} />
                </Td>
                <Td>
                    <Tag size="md" colorScheme={randomColor}>
                        {item.category}
                    </Tag>
                </Td>
                <Td>{item.createdBy}</Td>
                <Td isNumeric>{item.views}</Td>
                <Td isNumeric>{item.noOfVideos}</Td>
                <Td isNumeric>
                    <HStack justifyContent={'flex-end'}>
                        <Button
                            size={'sm'}
                            colorScheme='purple'
                            fontWeight={300}
                            variant={'ghost'}
                            onClick={() => courseDetailsHandler(item._id, item.title)}
                            isLoading={loadingItemId === item._id}
                        >
                            View Lectures
                        </Button>

                        <Button
                            size={'sm'}
                            colorScheme='purple'
                            variant={'ghost'}
                            onClick={() => deleteCourseHandler(item._id)}
                            isLoading={loadingItemId === item._id}
                        >
                            <DeleteIcon />
                        </Button>
                    </HStack>
                </Td>
            </Tr>
        </>
    )
}
