import { Avatar, Box, Button, Center, Divider, Flex, Tag, TagLabel, Text, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
// import { FacebookProvider, Page } from 'react-facebook'
// import { FaFacebook, FaTwitter } from 'react-icons/fa'
// import { FacebookEmbed } from 'react-social-media-embed'

export default function BloggerRightSidebar() {
    return (

        <Box>
            <Box w='full' mb={5}>

                <Box px={3} py={2} mb={2} bg='blackAlpha.100'>
                  <Title order={5}>আমার ফেসবুক পেজ</Title>
                </Box>
                {/* <FacebookProvider appId="561683539070348">
                    <Page href="https://www.facebook.com/kitchen.flavour.ctg" tabs="timeline" width={'auto'} />
                </FacebookProvider> */}
            </Box>


        </Box>
    )
}
