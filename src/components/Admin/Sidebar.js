import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Box, Button, VStack } from '@chakra-ui/react'

import GridViewIcon from '@mui/icons-material/GridView'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import DesignServicesIcon from '@mui/icons-material/DesignServices'


const Sidebar = () => {

    const location = useLocation()

    return (
        <>
            <VStack
                spacing={'6'}
                padding={'8'}
                boxShadow={'-2px 0 20px rgba(107,70,193,0.3)'}
            >
                <LinkButton
                    url={'dashboard'}
                    Icon={GridViewIcon}
                    Text={"DashBoard"}
                    active={location.pathname === '/admin/dashboard'}
                />
                <LinkButton
                    url={'courses'}
                    Icon={LocalLibraryIcon}
                    Text={"Courses"}
                    active={location.pathname === '/admin/courses'}
                />
                <LinkButton
                    url={'users'}
                    Icon={PeopleAltIcon}
                    Text={"Users"}
                    active={location.pathname === '/admin/users'}
                />
                <LinkButton
                    url={'create-course'}
                    Icon={DesignServicesIcon}
                    Text={"Create Course"}
                    active={location.pathname === '/admin/create-course'}
                />
            </VStack>
        </>
    )
}

export default Sidebar


function LinkButton({ url, Icon, Text, active }) {
    return (
        <>
            <Box display={'flex'} alignItems={'center'} width={'full'} >
                <Icon
                    style={{
                        color: active ? '#805AE9' : ''
                    }}
                />
                <Link
                    to={`/admin/${url}`}
                >
                    <Button
                        fontWeight={300}
                        color={active ? '#805AE9' : ''}
                        variant={'ghost'}
                        colorScheme={active ? 'purple' : ''}
                        marginLeft={'5px'}
                    >
                        &nbsp;{Text}
                    </Button>
                </Link>
            </Box>
        </>
    )
}