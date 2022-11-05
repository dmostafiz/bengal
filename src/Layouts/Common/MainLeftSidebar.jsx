import { Box, Button, Center, Divider, Flex, FormControl, FormHelperText, FormLabel, Input, Show, Spacer, Text } from '@chakra-ui/react'
import { NavLink, Title } from '@mantine/core'
import { IconActivity, IconBook, IconChevronRight, IconListCheck, IconListDetails } from '@tabler/icons'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FaBlog, FaMicroblog } from 'react-icons/fa'
import { MdOutlineForum } from 'react-icons/md'
import { Book, BookDownload, ListDetails } from 'tabler-icons-react'
import AuthComponent from '../../Components/Common/AuthComponent'
import BlogPanel from '../../Components/Common/BlogPanel'
import { AuthContext } from '../../Contexts/AuthContext'
import useUser from '../../Hooks/useUser'

export default function MainLeftSidebar({ authpanel = true }) {

    const { authUser, isLoading, isError, error } = useUser()

    // console.log('Leftside auth: ', authUser)

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



        </Box>
    )
}
