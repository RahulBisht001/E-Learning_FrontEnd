import React from 'react'
import { VStack, Spinner } from '@chakra-ui/react'
const Loader = () => {
    return (
        <VStack h='100vh' justifyContent={'center'}>
            <div style={{ transform: 'scale(4)' }}>
                <Spinner
                    thickness='2px'
                    speed='0.75s'
                    size='sm'
                    emptyColor='transparent'
                    color='#9F7AEA'
                >
                </Spinner>
            </div>
        </VStack>
    )
}

export default Loader