import React from 'react'
import { Avatar, AvatarBadge, Box, Divider, Flex, Show, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import AuthComponent from '../../Components/Common/AuthComponent'
import AuthorHoverCard from '../../Components/Common/AuthorHoverCard'
import BlogPanel from '../../Components/Common/BlogPanel'
import banglaNumber from '../../Helpers/banglaNumber'
import useOnlineUser from '../../Hooks/useOnlineUser'
import useUser from '../../Hooks/useUser'

export default function MainLeftSidebar({ authpanel = true }) {

    const { authUser, isLoading, isError, error } = useUser()

    const {onlineUsers, onlineBloggers, onlineReaders} = useOnlineUser()

    return (
        <Box>

            <Show above='md'>
                <BlogPanel />
            </Show>


            {(!isLoading && authpanel == true) && <Box mb={5} shadow='sm'>
                {/* <Box bg='gray.100' py={2} px={2} mb={1}>
                    <Text order={5}>একাউন্ট এ প্রবেশ করুন</Text>
                </Box> */}
                {!authUser && <AuthComponent px={5} />}

            </Box>}

            {/* <Box mb={5} w='full' bg='yellow.100' shadow={'sm'} rounded='sm' overflow={'hidden'}>
                <Center p={3} bg='yellow.200'>
                    <Title order={5}>নোটিস বোর্ড</Title>
                </Center>

                <Divider color={'yellow.500'} />

                <Box p={3} color={'yellow.900'} fontWeight='normal'>
                    <Text textAlign={'justify'}>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
                </Box>
            </Box> */}

            <Box w='full' bg='' mb={5}>

                <Box bg='blackAlpha.50' p={2}>
                    <Title order={6}>{onlineUsers.length
                        ? <> অনলাইনে আছেন {banglaNumber(onlineUsers.length)} জন </>
                        : <>কেউ অনলাইনে নেই</>}</Title>
                </Box>

                <Box p={2}>
                    <Flex alignItems={'center'} gap={3}>
                        <Text as={'h6'} size='sm' my={2}>
                            {banglaNumber(onlineReaders.length)} জন পাঠক
                        </Text>
                        <Divider height={'20px'} borderColor='blackAlpha.300' orientation='vertical' />
                        <Text as={'h6'} size='sm' my={2}>
                            {banglaNumber(onlineBloggers.length)} জন ব্লগার
                        </Text>
                    </Flex>

                    <Divider mb={2} borderColor='blackAlpha.300' />

                    <Box>
                        {onlineBloggers.map((user, index) => <Box key={index} py={2} borderBottom='1px' borderColor='blackAlpha.200'>
                            <Flex alignItems={'center'} gap={2}>
                                <Avatar size={'xs'} src={user.avatar} name={user.displayName}>
                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                </Avatar>
                                <AuthorHoverCard author={user} />

                            </Flex>
                        </Box>
                        )}
                    </Box>

                </Box>

            </Box>



        </Box>
    )
}
