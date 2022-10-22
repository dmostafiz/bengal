import { Box, Button, Center, Flex, FormControl, FormErrorMessage, Image, Input, Spacer, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import useLogin from '../../Hooks/useLogin'
import MainLeftSidebar from '../../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../../Layouts/Common/MainRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import CustomButton from '../../Components/Common/CustomButton'
import { FaFacebook } from 'react-icons/fa'
import BlogPanel from '../../Components/Common/BlogPanel'
import useUser from '../../Hooks/useUser'
import ComponentLoader from '../../Components/Common/ComponentLoader'
import SingleLoginComponent from '../../Components/Auth/SingleLoginComponent'

export default function login() {

    const { isLoading, authUser } = useUser()

    return (
        <HomeLayout>

            <LayoutColumn
                leftSide={<><BlogPanel /></>}
                rightSide={<></>}
                leftColumnWidth={32}
            // rightSide={<MainRightSidebar />}

            >

                {!isLoading ? <Box mb={8}>
                    <Box py={3} mb='5' bg={''} fontWeight='bold' borderBottom={'1px'} borderColor='blackAlpha.100' rounded='sm'>
                        <Title order={2}>{authUser ? 'আপনি লগইন অবস্থাই আছেন' : 'লগইন করুন'}</Title>
                    </Box>

                    {!authUser ?
                        <SingleLoginComponent />
                        : <></>}

                </Box> : <ComponentLoader size='xl' />}



            </LayoutColumn>

        </HomeLayout>
    )
}
