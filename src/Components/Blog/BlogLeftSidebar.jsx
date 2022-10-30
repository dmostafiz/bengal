import { Avatar, Box, Button, Center, Divider, Flex, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { NavLink, Title } from '@mantine/core'
import { IconListCheck, IconListDetails } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { MdOutlineForum } from 'react-icons/md'
import PostCard from '../Common/PostCard'
import SidebarPostCard from '../Common/SidebarPostCard'

export default function BlogLeftSidebar() {
    return (

        <Box>
            {/* <Box mb={5} bg=''>

                <Box bg={'blackAlpha.100'}>
                    <Link href='/'>
                        <NavLink
                            label={<Text fontSize={'16px'}>ব্লগ প্রথম পাতা</Text>}
                            // description={'সকল পোস্ট দেখুন'}
                            icon={<IconListDetails size={32} stroke={2} />}
                            // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                            active
                            variant="subtle"
                            color={'dark'}
                        />
                    </Link>

                </Box>

                <Box>
                    <Link href='/selected_posts'>
                        <NavLink
                            label={<Text fontSize={'16px'}>বাছাইকৃত পোস্ট সমূহ</Text>}
                            // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                            icon={<IconListCheck size={32} stroke={2} />}
                            // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                            active
                            variant="subtle"
                            color={'dark'}
                        />
                    </Link>

                </Box>

                <Box>
                    <NavLink

                        label={<Text fontSize={'16px'} fontWeight={700}>কমিউনিটি ফোরাম</Text>}
                        description={'ব্লগ এর যেকোনো সমস্যা পোস্ট করুন এবং অন্যদের সমস্যা সমাধান করতে সাহায্য করুন'}
                        icon={<MdOutlineForum size={32} color='orange' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        active
                        variant="subtle"
                        color={'dark'}
                    />
                </Box>
            </Box> */}

    
        </Box>
    )
}
