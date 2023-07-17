import React, { useEffect } from 'react'
import {
    Box, Grid, HStack,
    Heading, Progress, Stack, Text
} from '@chakra-ui/react'

import Sidebar from '../Sidebar'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { DoughnutChart, LineChart } from './Chart';

import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStats } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';


const Databox = ({ title, qty, qtyPercentage, profit }) => {
    return (
        <>
            <Box
                // width={['full', '30%']}
                p='4'
                boxShadow={'-2px 0 20px rgba(107,70,193,0.3)'}
                borderRadius={'lg'}
                className='adminBoxWidth'
            >
                <Text children={title} mb={2} />
                <HStack spacing={['6', '10']} mb={2}>
                    <Text fontWeight={600} fontSize={['14px', '20px']} >{qty}</Text>
                    <HStack>
                        <Text children={`${qtyPercentage}%`} />
                        {profit
                            ? <ArrowUpwardIcon style={{
                                color: '#00C851'
                            }} />
                            : <ArrowDownwardIcon style={{
                                color: '#FF4444'
                            }} />
                        }
                    </HStack>
                </HStack>

                <Text opacity={0.6}>
                    Since Last Month
                </Text>
            </Box >
        </>
    )
}


const Bar = ({ title, value, profit }) => {

    return (
        <>
            <Box py='2' px={['0', '20']}>
                <Heading size={'sm'} mb='2' className='defaultFontFamily'>
                    {title}
                </Heading>
                <HStack width='full' alignItems='center'>
                    <Text>{profit ? "0%" : `-${value}%`}</Text>
                    <Progress
                        size={'sm'}
                        rounded={'0'}
                        w='full'
                        value={profit ? value : 0}
                        colorScheme='purple'
                    />
                    <Text >{value > 100 ? value : 100}%</Text>
                </HStack>
            </Box>
        </>
    )
}



const Dashboard = () => {

    const dispatch = useDispatch()
    const {
        error, message, stats, usersCount, subscriptionsCount, viewsCount,
        usersPercentage, viewsPercentage, subscriptionsPercentage, usersProfit,
        subscriptionsProfit, viewsProfit
    } = useSelector((state) => state.admin)

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

    useEffect(() => {
        dispatch(getDashboardStats())
    }, [dispatch])

    return (
        <>
            <Grid
                minH={'100vh'}
                templateColumns={['1fr', '5fr 1fr']}
            >
                <Box
                    boxSizing='border-box'
                    py={'16'}
                    px={['2', '0']}
                >
                    <Text textAlign={'center'} opacity={0.5} >
                        {stats && `Last Change was on ${String(new Date(stats[11].createdAt)).split("G")[0]}`}
                    </Text>

                    <Heading
                        my={'5'}
                        fontSize={'25px'}
                        ml={['0', '16']}
                        textAlign={['center', 'left']}
                        className='defaultFontFamily'
                    >
                        DashBoard
                    </Heading>

                    <Stack
                        direction={['column', 'row']}
                        justifyContent={'space-around'}
                    >
                        <Databox
                            title="Views"
                            qty={viewsCount}
                            qtyPercentage={viewsPercentage}
                            profit={viewsProfit}
                        />
                        <Databox
                            title="Users"
                            qty={usersCount}
                            qtyPercentage={usersPercentage}
                            profit={usersProfit}
                        />
                        <Databox
                            title="Subscriptions"
                            qty={subscriptionsCount}
                            qtyPercentage={subscriptionsPercentage}
                            profit={subscriptionsPercentage}
                        />
                    </Stack>

                    <Box
                        mx={['0', '16']}
                        my={['2', '4']}
                        borderRadius={'lg'}
                        p={['0', '10']}
                        paddingTop={['0', '4']}
                        mt={['4', '16']}
                        boxShadow={'-2px 0 20px rgba(107,70,193,0.3)'}
                    >
                        <Box display={'flex'} alignItems={'end'} >
                            <EqualizerIcon fontSize='large' />
                            <Heading
                                textAlign={['center', 'left']}
                                pt={['8', '0']}
                                ml={'4'}
                                fontSize={['18px', '22px']}
                                className='defaultFontFamily'
                            >
                                Views Graph
                            </Heading>
                        </Box>

                        {/* //? _____ Line CHart Component */}
                        {stats && <LineChart stats={stats} />}

                    </Box>

                    <Grid templateColumns={['1fr', '2fr 1fr']}>
                        <Box p="4">
                            <Heading
                                my="8"
                                ml={['0', '16']}
                                textAlign={['center', 'left']}
                                size={'md'}
                                className='defaultFontFamily'
                            >
                                Progress Bar
                            </Heading>

                            <Box>
                                <Bar title="Views" value={viewsPercentage} profit={viewsProfit} />
                                <Bar title="Users" value={usersPercentage} profit={usersProfit} />
                                <Bar title="Subscription" value={subscriptionsPercentage} profit={subscriptionsProfit} />
                            </Box>
                        </Box>

                        <Box p={['2', '4']}>
                            <Heading
                                size="md"
                                my="8"
                                textAlign={'center'}
                                className='defaultFontFamily'
                            >
                                Users
                            </Heading>

                            {/* //? ___ Doughnut Graph ___ */}
                            <DoughnutChart usersData={[subscriptionsCount, usersCount - subscriptionsCount]} />
                        </Box>
                    </Grid>

                </Box>
                <Sidebar />
            </Grid>
        </>
    )
}

export default Dashboard