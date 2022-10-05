import { Box, Center, Divider, Spacer, Text } from '@chakra-ui/react'
import { NavLink, Title } from '@mantine/core'
import { IconActivity, IconChevronRight, IconListCheck, IconListDetails } from '@tabler/icons'
import React from 'react'
import { ListDetails } from 'tabler-icons-react'

export default function MainLeftSidebar() {
    return (
        <Box>

            <Box mb={5} bg=''>

                <Box bg={'blackAlpha.100'}>
                    <NavLink
                        label="সকল পোস্ট"
                        // description={'সকল পোস্ট দেখুন'}
                        icon={<IconListDetails size={32} stroke={2} />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        active
                        variant="subtle"
                        color={'dark'}
                    />

                </Box>

                <Box>
                    <NavLink

                        label="বাছাইকৃত পোস্ট"
                        // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                        icon={<IconListCheck size={32} stroke={2} />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        active
                        variant="subtle"
                        color={'dark'}
                    />
                </Box>

                <Box>
                    <NavLink

                        label="নোটিস বোর্ড"
                        // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                        icon={<IconListCheck size={32} stroke={2} />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        active
                        variant="subtle"
                        color={'dark'}
                    />
                </Box>
            </Box>



            <Box w='full' bg='yellow.100' shadow={'sm'} rounded='sm' overflow={'hidden'}>
                <Center p={3} bg='yellow.200'>
                    <Title order={3}>নোটিস বোর্ড</Title>
                </Center>

                <Divider color={'yellow.500'} />

                <Box p={3} color={'yellow.900'} fontWeight='normal'>
                    <Text>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
                </Box>
            </Box>
        </Box>
    )
}
