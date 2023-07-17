import React, { useEffect, useState } from 'react'
import {
    Box, Button, Grid, HStack,
    Heading, Table, TableCaption, Tag,
    TableContainer, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react'


import Sidebar from '../Sidebar'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import DeleteIcon from '@mui/icons-material/Delete'

import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin'

// import Loader from '../../Layout/Loader/Loader'
import { toast } from 'react-hot-toast'


const Users = () => {

    const dispatch = useDispatch()
    const { allUsers, error, message } = useSelector((state) => state.admin)


    const [loadingItemId, setLoadingItemId] = useState(null);
    const [loadingDeleteId, setLoadingDeleteId] = useState(null);


    const deleteUserHandler = (userId) => {
        dispatch(deleteUser(userId))
        setLoadingDeleteId(userId)
    }

    const updateHandler = (userId) => {
        dispatch(updateUserRole(userId))
        setLoadingItemId(userId)
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

        setLoadingItemId(null)
        setLoadingDeleteId(null)
        dispatch(getAllUsers())
    }, [dispatch, error, message])

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
                        <PeopleAltIcon />
                        <Heading
                            className='defaultFontFamily'
                            textAlign={['center', 'left']}
                            fontSize={'24px'}
                            marginLeft={'10px'}
                        >
                            All Users
                        </Heading>
                    </Box>

                    <TableContainer width={['100vw', 'full']} className='scrollbar'>
                        <Table
                            variant={'simple'}
                            size={'lg'}
                        >
                            <TableCaption className='defaultFontFamily'>
                                All Available Users in The DataBase
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th className='defaultFontFamily'>Id</Th>
                                    <Th className='defaultFontFamily'>Name</Th>
                                    <Th className='defaultFontFamily'>Email</Th>
                                    <Th className='defaultFontFamily'>Role</Th>
                                    <Th className='defaultFontFamily'>Subscription</Th>
                                    <Th className='defaultFontFamily' isNumeric>Action</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {allUsers && allUsers.map((item, idx) => (
                                    <Row
                                        key={idx}
                                        item={item}
                                        updateHandler={updateHandler}
                                        deleteUserHandler={deleteUserHandler}
                                        loadingItemId={loadingItemId}
                                        loadingDeleteId={loadingDeleteId}
                                    />
                                ))}
                            </Tbody>

                        </Table>
                    </TableContainer>
                </Box>
                <Sidebar />
            </Grid>
        </>
    )
}

export default Users



function Row({ item, updateHandler, deleteUserHandler, loadingItemId, loadingDeleteId }) {

    const tagColor = item.role === 'admin' ? 'red' : 'whatsapp'


    return (
        <>
            <Tr>
                <Td># {item._id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>
                    <Tag size="md" colorScheme={tagColor}>
                        {item.role}
                    </Tag>
                </Td>
                <Td>
                    {item.subscription && item.subscription.status === 'active' ? 'Active' : 'Not Active'}
                </Td>
                <Td isNumeric>
                    <HStack justifyContent={'flex-end'}>
                        <Button
                            size={'sm'}
                            colorScheme='purple'
                            fontWeight={300}
                            variant={'ghost'}
                            onClick={() => { updateHandler(item._id) }}
                            isLoading={loadingItemId === item._id}
                        >
                            Change Role
                        </Button>

                        <Button
                            size={'sm'}
                            colorScheme='purple'
                            variant={'ghost'}
                            onClick={() => deleteUserHandler(item._id)}
                            isLoading={loadingDeleteId === item._id}
                        >
                            <DeleteIcon />
                        </Button>
                    </HStack>
                </Td>
            </Tr>
        </>
    )
}