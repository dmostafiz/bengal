import { Box, Divider } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import SingleLoginComponent from './SingleLoginComponent'

export default function AuthWrapperLoginFrom({redirectUrl = null}) {

    return (
        <>
            <Box py={2}>
                <Title order={3}>এই পেজটি শুধুমাত্র নিবন্ধিত সদস্যদের জন্য সংরক্ষিত</Title>
            </Box>
            <Divider mb={5} />
            <Box p={5}>
                <SingleLoginComponent redirectUrl={redirectUrl} />
            </Box>
        </>
    )
}
