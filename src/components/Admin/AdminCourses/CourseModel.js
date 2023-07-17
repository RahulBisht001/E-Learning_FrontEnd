import React, { useState } from 'react'
import {
    Box, Button, FormLabel, Grid, Heading, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Stack, Text, Textarea, VStack
} from '@chakra-ui/react'


import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector } from 'react-redux'



const CourseModel = ({ isOpen, onClose, onOpen, id,
    deleteLectureHandler, addNewLectureHandler,
    courseTitle, lectures = [], isLoading }) => {



    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [videoPreview, setVideoPreview] = useState('')


    const [Id, setId] = useState('')

    //** This is very important code ( File Select) */
    //? ____________________________________________________________________
    //? ---------------------------------------------------------------------


    const changeVideoHandler = (e) => {
        const file = e.target.files[0]
        console.log("Your Files Object")
        console.log(file)

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setVideoPreview(reader.result)
            console.log("HI")
            setVideo(file)
            console.log(video)
        }
    }
    //? _____________________________________________________________________
    //? ---------------------------------------------------------------------

    const clearVideo = () => {
        setVideoPreview(null);
    };


    const { loading } = useSelector((state) => state.admin)

    return (
        <>
            <Modal
                isOpen={isOpen}
                size={'full'}
                onClose={onClose}
                scrollBehavior='inside'
                className="scrollbar"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader className='defaultFontFamily' px={[4, 10]}>
                        {courseTitle}
                    </ModalHeader>

                    <ModalBody p={[4, 10]}>
                        <Grid templateColumns={['1fr', '3fr 1fr']}>

                            <Box px={['0', '10']}>
                                <Box my={'5'}>
                                    <Heading
                                        children={courseTitle}
                                        size={'md'}
                                        className='defaultFontFamily'
                                        mb={5}
                                    />
                                    <Heading
                                        children={`# ${id}`}
                                        size={'sm'}
                                        opacity={0.4}
                                        fontWeight={300}
                                        className='defaultFontFamily' />
                                </Box>
                                <Heading
                                    children="Lectures"
                                    className='defaultFontFamily'
                                    size={['md', 'lg']}
                                />
                                {lectures.map((elem, indx) => {
                                    return (
                                        <VideoCard
                                            id={elem._id}
                                            title={elem.title}
                                            description={elem.description}
                                            num={indx + 1}
                                            lectureId={elem._id}
                                            courseId={id}
                                            deleteLectureHandler={deleteLectureHandler}
                                            loading={elem._id === Id}
                                            setId={setId}
                                        />
                                    )
                                })}
                            </Box>

                            <Box
                                p={4}
                                rounded={'lg'}
                            >
                                <VStack
                                    justifyContent={'center'}
                                    spacing={'8'}
                                    className='defaultFontFamily'
                                >
                                    <Heading
                                        children="Add a New Lecture"
                                        size={'md'}
                                        className='defaultFontFamily'
                                    />
                                    <form
                                        style={{ width: '100%' }}
                                        onSubmit={(e) =>
                                            addNewLectureHandler(e, id, title, description, video)}
                                    >
                                        <Box mb={5} >
                                            <FormLabel
                                                htmlFor="title"
                                                children="Title"
                                                fontSize={'12px'}
                                                m={0}
                                            />
                                            <Input
                                                required
                                                id="title"
                                                value={title}
                                                onChange={e => {
                                                    setTitle(e.target.value);
                                                }}
                                                placeholder="Lecture Title"
                                                type="text"
                                                focusBorderColor="purple.600"
                                            />
                                        </Box>

                                        <Box mb={5} >
                                            <FormLabel
                                                htmlFor="description"
                                                children="Description"
                                                fontSize={'12px'} m={0}
                                            />
                                            <Textarea
                                                required
                                                id="description"
                                                value={description}
                                                onChange={e => {
                                                    setDescription(e.target.value);
                                                }}
                                                className='scrollbar'
                                                placeholder="Add Description for the lecture"
                                                focusBorderColor="purple.600"
                                            />
                                        </Box>

                                        <Box
                                            position="relative"
                                            width={'100%'}
                                            height={["200px", "150px"]}
                                            border="1px solid #E2E8F0"
                                            borderRadius="md"
                                            overflow="hidden"
                                            cursor="pointer"
                                        >
                                            {videoPreview ? (
                                                <>
                                                    <video
                                                        controls
                                                        controlsList='nodownload noremoteplayback'
                                                        muted
                                                        loop
                                                        disablePictureInPicture
                                                        disableRemotePlayback
                                                        src={videoPreview}
                                                        alt="Selected Lecture Thumbnail"
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                    >
                                                    </video>

                                                    <Box
                                                        position="absolute"
                                                        top={-1}
                                                        right={1}
                                                        zIndex={100}
                                                        cursor="pointer"
                                                        onClick={clearVideo}
                                                    >
                                                        {/* You can use a custom "Clear" button or an icon */}
                                                        {/* Here, I'm using a simple 'x' symbol */}
                                                        <span
                                                            style={{
                                                                fontSize: '20px',
                                                                fontWeight: '900',
                                                                color: '#A15CF9',
                                                                backgroundColor: '#fff',
                                                                borderRadius: '6px'
                                                            }}
                                                        >
                                                            &nbsp;&#x2715;&nbsp;
                                                        </span>
                                                    </Box>
                                                </>
                                            ) : (
                                                <Input
                                                    alignSelf="flex-start"
                                                    required
                                                    accept="video/mp4"
                                                    height={["200px", "150px"]}
                                                    type="file"
                                                    focusBorderColor="purple.600"
                                                    css={{
                                                        '&::file-selector-button': {
                                                            cursor: 'pointer',
                                                            marginLeft: '-5%',
                                                            width: '110%',
                                                            border: 'none',
                                                            height: '100%',
                                                            color: '#805AD5',
                                                            backgroundColor: '#FFF',
                                                        },
                                                    }}
                                                    onChange={changeVideoHandler}
                                                />
                                            )}
                                        </Box>

                                        <Button
                                            mt={5}
                                            width={'full'}
                                            fontWeight={300}
                                            colorScheme='purple'
                                            type='submit'
                                            isLoading={loading}
                                        >
                                            Upload
                                        </Button>
                                    </form>
                                </VStack>
                            </Box>
                        </Grid>
                    </ModalBody>

                    <ModalFooter m={0} px={2}>
                        <Button
                            onClick={onClose}
                            className='defaultFontFamily'
                            fontWeight={300} w={'120px'}
                            variant={'outline'}
                            colorScheme='purple'
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default CourseModel


function VideoCard({ title, description, num,
    lectureId, courseId, deleteLectureHandler, loading, setId }) {

    return (
        <>
            <Stack
                direction={['column', 'row']}
                my={'8'}
                p={4}
                borderRadius={'lg'}
                boxShadow={"0 0 10px rgba(107,70,193,0.5)"}
                justifyContent={['flex-start', 'space-between']}
            >
                <Box>
                    <Heading
                        size={'sm'}
                        children={`# ${num} ${title}`}
                        className='defaultFontFamily'
                        mb={4}
                    />
                    <Text children={description} className='defaultFontFamily' />
                </Box>

                <Button
                    variant={'ghost'}
                    colorScheme='purple'
                    onClick={() => {
                        deleteLectureHandler(courseId, lectureId)
                        setId(lectureId)
                    }}

                    isLoading={loading}
                >
                    <DeleteIcon />
                </Button>
            </Stack>
        </>
    )
}