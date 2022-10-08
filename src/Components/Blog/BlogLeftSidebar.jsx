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

            <Box w='full' mb={5}>

                <Box bg='blackAlpha.50' p={2}>
                    <Title order={5}>লেখক পরিচিতি</Title>
                </Box>

                <Box bg='whiteAlpha.900' p={3}>
                    <Flex direction={{ base: 'row', md: 'row' }} gap={3}>
                        <Box>
                            <Avatar size='md' rounded={'md'} shadow name='লিমন লস্কর' />
                        </Box>
                        <Box>
                            <Title order={4}><Text noOfLines={1}>লিমন লস্কর </Text></Title>
                            <Text fontSize={'12px'}>@limon_lashkar</Text>
                        </Box>
                    </Flex>

                    <Box py='2'>
                        <Box px={0}>
                            <Text noOfLines={2} fontSize='13px'>রূপালী রাতে, স্বপ্নের ও নীল চাদর বিছিয়ে, কষ্টের শীতল আবরন জড়িয়ে আমি আছি, আছি, তোমার স্মৃতিতে ভালবাসার সরল বাধন ছিড়ে, চলে গেছ এই হৃদয়টাকে ভেঙ্গে তুমি আমি একই শহরে তবুও একাকী ভিন্ন গ্রহে</Text>
                        </Box>

                        <Divider my={1} />

                        <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                            <Wrap spacing={2} alignItems='flex-end'>
                                <Text><Text as='span' fontSize={'16px'} fontWeight='bold'>১৪</Text> জন অনুসরন করছে</Text>
                                <Button size='xs' rounded={'none'} colorScheme={'blackAlpha'}>অনুসরণ করুন</Button>
                            </Wrap>
                        </Box>
                    </Box>
                    {/* <Divider my={1} /> */}
                </Box>
            </Box>


            <Box w='full' bg='' mb={5}>

                <Box bg='blackAlpha.50' p={2}>
                    <Title order={5}>লেখকের অন্যান্য পোস্ট</Title>
                </Box>


                <SidebarPostCard
                    title="বান্দুরা রানী পবিত্র জপমালা গীর্জা"
                    image='https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg'
                    content='ঢাকা থেকে মাত্র ১ ঘন্টা ৩০ মিনিটের দূরর্ত্বে নবাবগঞ্জে খ্রীষ্টান আদিনিবাস। এই নাবাগঞ্জে রয়েছে ধর্মীয় বিচিত্রতা ও সহবস্থান। রয়েছে প্রায় চারশ বছরের পুরান ভাঙ্গা মসজিদ ও প্রায় ২৪০ বছরের পূরান  "রানী পবিত্র জপমালা গীর্জা" যা বান্দুরা গীর্জা নামেও বহুল পরিচিত...'
                    createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
                    states={{
                        read: 5,
                        comment: 3,
                        like: 3
                    }}
                    author={{
                        name: 'লিমন লস্কর',
                        image: ''
                    }}
                />


                <SidebarPostCard
                    title="ফলের নাম না বলায় পুরো বাজারের ফল ট্রাক ভরে মায়ের জন্য নিয়ে এলেন ডিপজল"
                    image='https://s3.amazonaws.com/somewherein/pictures/balchirabongal/balchirabongal-1664883109-9202d32_xlarge.jpg'
                    content='পর্দায় যেমনই থাকুক না কেন, বাস্তব জীবনে হিরোর ভূমিকায় দেখা গেছে তাকে। বিভিন্ন সময়ে ডিপজলের সেবামূলক কাজের কথাও উঠে আসে। তবে তিনি তার মাকে প্রচন্ড ভালোবাসতেন। তার কাছের অনেকেই এমন কথা বলেন। কমেডি অভিনেতা জ্যাকি আলমগীর জানালেন, ডিপজল সাহেব প্রচন্ড মা ভক্ত। মায়ের প্রতি ডিপজলের ভালোবাসার কথা জানিয়ে জ্যাকি...'
                    createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
                    states={{
                        read: 5,
                        comment: 3,
                        like: 3
                    }}
                    author={{
                        name: 'লিমন লস্কর',
                        image: ''
                    }}
                />


                <SidebarPostCard
                    title="জনপ্রতিনিধিদের জবাবদিহিতাহীন এই সংস্কৃতি আরও কত বছর চলবে?"
                    image='https://s3.amazonaws.com/somewherein/pictures/SabbirShakil666/SabbirShakil666-1664873600-089caf6_xlarge.jpg'
                    content='এদেশের কনস্টিটিউশন অনুযায়ী পাঁচ বছর পরপর ভোটের মাধ্যমে জনপ্রতিনিধি, সরকার গঠন করার নিয়ম । কিন্তু পুরো পাঁচ বছর কেটে গেলেও এদেশের সব এলাকাতে জনপ্রতিনিধি আর জনতার মুখোমুখি কোনো সেমিনার/সিম্পোজিয়াম/প্রোগ্রাম করা হয়? সোজাসাপ্টা উত্তর আসবে, ‘না’ । কোনো জবাবদিহিতা আছে? উত্তর হবে, ‘না’ । ...'
                    createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
                    states={{
                        read: 5,
                        comment: 3,
                        like: 3
                    }}
                    author={{
                        name: 'লিমন লস্কর',
                        image: ''
                    }}
                />
            </Box>
        </Box>
    )
}
