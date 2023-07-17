import React, { useEffect, useState } from 'react'
import {
    Box, Button, Container, FormLabel, Grid,
    Heading, Image, Input, Select, Stack, Textarea, VStack
} from '@chakra-ui/react'

import Sidebar from '../Sidebar'
import DesignServicesIcon from '@mui/icons-material/DesignServices'

import categories from '../../../constants/Categories'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from '../../../redux/actions/admin'

import toast from 'react-hot-toast'


const CreateCourse = () => {


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [image, setImage] = useState('')
    const [imgPreview, setImgPreview] = useState('')


    //** This is very important code ( File Select) */
    //? ____________________________________________________________________

    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        console.log("Your Files Object")
        console.log(file)

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImgPreview(reader.result)

            console.log("HI")
            setImage(file)
            console.log(image)
        }
    }
    //? _____________________________________________________________________

    const clearImage = () => {
        setImgPreview(null);
    };

    const { loading, error, message } = useSelector((state) => state.admin)
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.append('title', title)
        myForm.append('description', description)
        myForm.append('category', category)
        myForm.append('createdBy', createdBy)
        myForm.append('file', image)

        dispatch(createCourse(myForm))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: 'clearMessage' })
        }
    }, [dispatch, error, message])

    return (
        <>
            <Grid
                minH={'100vh'}
                templateColumns={['1fr', '5fr 1fr']}
            >
                <Container
                    py={'20'}
                    maxW={['100%', '85%']}
                >
                    <Box
                        display={'flex'}
                        alignItems={'self-start'}
                        mb={10}
                    >
                        <DesignServicesIcon />
                        <Heading
                            className='defaultFontFamily'
                            textAlign={['center', 'left']}
                            fontSize={'24px'}
                            marginLeft={'10px'}
                        >
                            Create Course
                        </Heading>
                    </Box>

                    <VStack
                        spacing={[2, 8]}
                        m={'auto'}
                    >
                        <form style={{ width: '100%' }} onSubmit={submitHandler}>
                            <Stack spacing={2} direction={'row'}>
                                <Box mb={5} width={'50%'}>
                                    <FormLabel
                                        htmlFor="category"
                                        children="Category"
                                        fontSize={'12px'}
                                    />
                                    <Select
                                        focusBorderColor="purple.600"
                                        value={category}
                                        onChange={e => {
                                            setCategory(e.target.value);
                                        }}
                                    >
                                        <option
                                            value={""}
                                        >
                                            Category
                                        </option>
                                        {
                                            categories.map((item, idx) => (
                                                <option
                                                    key={idx}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                </Box>
                                <Box mb={5} width={'50%'}>
                                    <FormLabel
                                        htmlFor="createdBy"
                                        children="Created By"
                                        fontSize={'12px'}
                                    />
                                    <Input
                                        focusBorderColor='purple.600'
                                        type='text'
                                        placeholder='Creator Name'
                                        required
                                        onChange={(e) => setCreatedBy(e.target.value)}
                                        id='createdBy'
                                        value={createdBy}
                                    />
                                </Box>
                            </Stack>

                            <Box mb={5}>
                                <FormLabel
                                    htmlFor="title"
                                    children="Course Title"
                                    fontSize={'12px'}
                                />
                                <Input
                                    focusBorderColor='purple.600'
                                    type='text'
                                    placeholder='Add Title Of Your Course'
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                    id='title'
                                    value={title}
                                />
                            </Box>

                            <Box display={'flex'} flexDirection={['column', 'row']}>
                                <Box
                                    position="relative"
                                    width={['100%', '50%']}
                                    height="200px"
                                    border="1px solid #E2E8F0"
                                    borderRadius="md"
                                    overflow="hidden"
                                    cursor="pointer"
                                    mb={2}
                                    marginRight={['0px', '10px']}
                                >
                                    {imgPreview ? (
                                        <>
                                            {imgPreview && <Image
                                                src={imgPreview}
                                                alt="Selected Course Thumbnail"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                                objectFit="contain"
                                            />
                                            }
                                            <Box
                                                position="absolute"
                                                top={0}
                                                right={1}
                                                zIndex={100}
                                                cursor="pointer"
                                                onClick={clearImage}
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
                                            alignSelf="center"
                                            required
                                            id="image"
                                            accept="image/*"
                                            height="200px"
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
                                            onChange={changeImageHandler}
                                        />
                                    )}
                                </Box>

                                <Box width={['100%', '50%']} mb={2} marginLeft={['0px', '10px']}>
                                    <Textarea
                                        required
                                        id="course"
                                        value={description}
                                        onChange={e => {
                                            setDescription(e.target.value);
                                        }}
                                        className='scrollbar'
                                        placeholder="Write description of your course here . . ."
                                        focusBorderColor="purple.600"
                                        height={'200px'}
                                    />
                                </Box>
                            </Box>

                            <Button
                                width={'full'}
                                marginTop={6}
                                colorScheme='purple'
                                fontWeight={300}
                                type='submit'
                                isLoading={loading}
                            >
                                Add Course
                            </Button>
                        </form>
                    </VStack>
                </Container>
                <Sidebar />
            </Grid>
        </>
    )
}

export default CreateCourse