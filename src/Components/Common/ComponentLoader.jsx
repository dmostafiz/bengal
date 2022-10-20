import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

export default function ComponentLoader({size ='lg'}) {
    return (
        <Center w='full' py='200px'>
            <Spinner color='blackAlpha.400' size={size} />
        </Center>
    )
}
