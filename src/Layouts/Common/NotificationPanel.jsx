import { Avatar, AvatarBadge, Badge, Box, Button, Center, Flex, Heading, Icon, Menu, MenuButton, MenuList, Show, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { BellOff } from 'tabler-icons-react'
import Axios from '../../Helpers/axiosHelper'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import useOnlineUser from '../../Hooks/useOnlineUser'

export default function NotificationPanel() {
    const router = useRouter()

    const [notifications, setNotifications] = useState([])

    const { isUserOnline } = useOnlineUser()


    useQuery(['getNotifications', router.asPath], async () => {

        const response = await Axios.get('/user/notifications')

        if (response?.data?.ok) {
            setNotifications(response?.data?.notifications)

            return response?.data?.notifications
        }

        return null

    })


    async function sendNotificationRequest(not, link) {

        await Axios.post(`/user/seen_notification/${not.id}`)

        router.push({
            pathname: link,
            query: { comment: not.commentId },
        })

    }



    return (
        <Menu>
            <MenuButton size={{ base: 'sm', md: 'md' }} as={Button} bg={{ base: 'transparent', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.100' } }} roundedLeft={{ base: 'lg', md: 'full' }} roundedRight={{ base: 'none', md: 'full' }} >
                <Flex alignItems={'center'} gap={1}>
                    <Box position={'relative'}>
                        <Icon position={'relative'} as={FaBell} fontSize={20} />
                        {notifications.length > 0 && <Badge position={'absolute'} top={-2} left={3} rounded='full' bg={'facebook.300'} color='white'>
                            {banglaNumber(notifications.length)}
                        </Badge>}
                    </Box>
                    <Show above='lg'><Text>নোটিফিকেশন</Text></Show>
                </Flex>
            </MenuButton>
            <MenuList shadow={'md'} rounded='none' pos={'relative'} top={{ base: '6px', md: '9px' }} right={0}>
                <Box width={{ base: '100vw', md: '350px' }} maxH='500px' overflowY={'auto'}>
                    {notifications.length ?
                        <Box p={2}>
                            <Box pb={3} px={2} borderBottom='1px' borderColor={'blackAlpha.300'}>
                                <Heading as='h6' size='sm'>{banglaNumber(notifications.length)} টি নোটিফিকেশন</Heading>
                            </Box>

                            {notifications.map((item, index) => {

                                return <Box w={'full'} key={index}>

                                    <Box onClick={() => sendNotificationRequest(item, item.link)} cursor={'pointer'} _hover={{ bg: 'blackAlpha.50' }} my={0} w='full' p={2}>
                                        <Flex justify={'space-between'}>
                                            <Flex alignItems={'center'} gap={2}>
                                                <Avatar size={'xs'} name={item.sender.displayName} src={item.sender.avatar}>
                                                    {isUserOnline(item.sender.id) && <AvatarBadge boxSize='12px' bg='green.500' />}
                                                </Avatar>
                                                <Box mt={'2px'}>
                                                    <Heading as='h6' size='xs'>{item.sender.displayName}</Heading>
                                                </Box>
                                            </Flex>

                                            <Text fontSize={'12px'} color='gray.500'>{formatDate(item.createdAt, '', true)}</Text>

                                        </Flex>
                                        <Box pl={8}>
                                            <Text fontSize={'14px'}>{item.text}</Text>
                                        </Box>
                                    </Box>

                                    <Box borderBottom={index + 1 < notifications.length ? '1px' : 'none'} borderColor={'blackAlpha.300'} />

                                </Box>
                            })}

                        </Box>

                        : <Center py={5}>
                            <Icon as={BellOff} color={'blackAlpha.500'} fontSize={'26px'} />
                            <Text color={'blackAlpha.500'}>কোন নোটিফিকেশন পাওয়া যায়নি</Text>
                        </Center>}

                </Box>

            </MenuList>
        </Menu>
    )
}
