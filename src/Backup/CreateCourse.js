import React, { useState } from 'react'
import {
    Box, Container, FormLabel, Grid,
    Heading, Input, Select, Stack, Textarea, VStack
} from '@chakra-ui/react'

import Sidebar from '../Sidebar'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'

import categories from '../../../constants/Categories'


const CreateCourse = () => {


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [image, setImage] = useState('')
    const [imgPreview, setImgPreview] = useState('')


    //** This is very important code ( File Select) */
    //? ____________________________________________________________________
    //? ---------------------------------------------------------------------


    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        console.log("Your Files Object")
        console.log(file)

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImgPreview(reader.result)

            setImage(file)
            console.log(image)
        }
    }
    //? _____________________________________________________________________
    //? ---------------------------------------------------------------------

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
                        mb={4}
                    >
                        <LocalLibraryIcon />
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
                        <form style={{ width: '100%' }} >
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
                                    id='name'
                                    value={title}
                                />
                            </Box>

                            <Box mb={5}>
                                <FormLabel
                                    htmlFor="description"
                                    children="Description"
                                    fontSize={'12px'}
                                />
                                <Textarea
                                    required
                                    id="course"
                                    value={description}
                                    onChange={e => {
                                        setDescription(e.target.value);
                                    }}
                                    className='scrollbar'
                                    placeholder="Write description of your course"
                                    focusBorderColor="purple.600"
                                />
                            </Box>

                            <Box mb={5}>
                                <FormLabel
                                    htmlFor="image"
                                    children="Course Thumbnail"
                                    fontSize={'12px'}
                                    m={0}
                                />
                                <Input
                                    alignSelf={'center'}
                                    required
                                    id="image"
                                    accept='image/*'
                                    type="file"
                                    focusBorderColor="purple.600"
                                    css={
                                        {
                                            "&::file-selector-button": {
                                                cursor: 'pointer',
                                                marginLeft: '-5%',
                                                width: '110%',
                                                border: 'none',
                                                height: '100%',
                                                color: '#805AD5',
                                                backgroundColor: '#FFF'
                                            }
                                        }
                                    }
                                    onChange={changeImageHandler}
                                />
                            </Box>
                        </form>
                    </VStack>

                </Container>
                <Sidebar />
            </Grid>
        </>
    )
}

export default CreateCourse