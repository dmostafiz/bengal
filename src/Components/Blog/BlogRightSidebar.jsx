import { Avatar, Box, Button, Center, Divider, Flex, Tag, TagLabel, Text, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

export default function BlogRightSidebar() {
    return (

        <Box>
            <Box w='full' mb={5}>

                {/* <Box py='2'>
                    <Title order={6}>শেয়ার করুন</Title>
                </Box> */}

                {/* <VStack>
                    <Button w={'full'} size='xs' rounded={'none'} colorScheme='facebook' leftIcon={<FaFacebook />}>
                        Facebook
                    </Button>
                    <Button w={'full'} size={'xs'} rounded='none' colorScheme='twitter' leftIcon={<FaTwitter />}>
                        Twitter
                    </Button>
                </VStack> */}
            </Box>


        </Box>
    )
}
