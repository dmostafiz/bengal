import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

export default function ComponentLoader({size ='lg', py='200', color='blackAlpha.500'}) {
    return (
        <Center w='full' py={py}>
            <Spinner color={color} size={size} />
        </Center>
    )
}
