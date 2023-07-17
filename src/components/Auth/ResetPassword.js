import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
    Box, Button, Container, FormLabel, Heading, IconButton,
    Input, InputGroup, InputRightElement, Stack, Text
} from '@chakra-ui/react'



import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { toast } from 'react-hot-toast'
import { resetPassword } from '../../redux/actions/profile'
import { useDispatch, useSelector } from 'react-redux'


const ResetPassword = () => {


    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const params = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, message, error } = useSelector((state) => state.profile)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(resetPassword(params.token, password))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: 'clearMessage' })
            navigate('/login')
        }

    }, [dispatch, error, message, navigate])


    return (
        <>
            <Container>
                <form style={{ width: '100%' }} onSubmit={submitHandler}>
                    <Heading
                        className='defaultFontFamily'
                        children="Reset Password"
                        textAlign={['center', 'left']}
                        marginTop={'100px'}
                        marginBottom={8}
                    />

                    <Text fontSize={16} mb={10} >
                        Enter the new password
                    </Text>

                    <Box mb={5}>
                        <FormLabel htmlFor="password" children="Password" fontSize={'12px'} m={0} />
                        <InputGroup>
                            <Input
                                required
                                id="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="$3RB@10#$)&"
                                type={showPassword ? 'text' : 'password'}
                                focusBorderColor="purple.600"
                            />
                            <InputRightElement width="3rem" alignItems={'center'} justifyContent={'center'}>
                                <IconButton
                                    onClick={() => { setShowPassword(!showPassword) }}
                                    h="auto"
                                    variant="unstyled"
                                    icon={showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Box>

                    <Button
                        colorScheme='purple'
                        fontWeight={300}
                        width={'100%'}
                        fontSize={18}
                        type='submit'
                        isLoading={loading}
                    >
                        Reset Password
                    </Button>

                    <Stack alignItems={'flex-end'} my={4}>
                        <Link to={'/login'}
                            style={{
                                fontSize: '15px',
                                textDecoration: 'underline',
                                color: '#6B46C1',
                                // fontWeight: 600
                            }}

                        >
                            Back to Login
                        </Link>
                    </Stack>
                </form>
            </Container>
        </>
    )
}

export default ResetPassword