import { Avatar, Box, Button, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { BellRinging, ChevronDown, Logout, Pencil, User } from 'tabler-icons-react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { FaBell, FaEnvelope } from 'react-icons/fa'
import { Affix } from '@mantine/core'

export default function TopBar() {
    return (

        <Box w='full' h='70px'>
            <Affix position={{ top: 0, right: 0, left: 0 }}>
                <SectionContainer as='header' bg={'#ffffff'} px={0}>
                    <Box bg={'white'} borderBottom='2px' borderColor={'gray.200'} shadow='sm'>
                        <Flex alignItems={'center'} justify={'space-between'} gap={5}>

                            <Flex alignItems={'center'} justify={'space-between'} gap={3}>
                                <Box h={'70px'}>
                                    <Image h={'full'} w={'full'} src='/logo.png' />
                                </Box>
                            </Flex>

                            <Box flex={1}>
                                <Input
                                    border='2px'
                                    borderColor='gray.300'
                                    w='full'
                                    _focus={{
                                        ring: 'none',
                                        borderColor: 'gray.300',
                                        roundedTop: '3xl',
                                        roundedBottom: 'none',
                                    }}
                                    rounded={'full'}
                                    placeholder='অনুসন্ধান করুন'
                                />

                            </Box>

                            <Flex alignItems={'center'} justify={'space-between'} gap={3}>

                                <Menu>
                                    <MenuButton as={Button} rounded='full' background='transparent'>
                                        <Flex alignItems={'center'} gap={1}>
                                            <FaBell size={20} /> <Text>নোটিফিকেশন</Text>
                                        </Flex>
                                    </MenuButton>
                                    <MenuList rounded='none'>
                                        <MenuItem>Download</MenuItem>
                                        <MenuItem>Create a Copy</MenuItem>
                                        <MenuItem>Mark as Draft</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                        <MenuItem>Attend a Workshop</MenuItem>
                                    </MenuList>
                                </Menu>

                                <Button rounded={'full'} colorScheme='yellow'>নগরশৈলীতে লিখুন</Button>

                                {/* <Box>

                    </Box> */}

                                <Menu>
                                    <MenuButton as={Button} _hover={{ background: 'transparent' }} _active={{ background: 'transparent' }} background='transparent' rightIcon={<ChevronDown />}>
                                        <Avatar size={'sm'} name='Mostafiz Rahaman' src='' />
                                    </MenuButton>
                                    <MenuList rounded='none' zIndex={9999}>
                                        <MenuItem icon={<User />}>প্রোফাইল</MenuItem>
                                        <MenuItem icon={<Pencil />}>আমার লিখাসমূহ</MenuItem>
                                        <MenuItem>Mark as Draft</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                        <MenuItem icon={<Logout />}>লগ-আউট করুন</MenuItem>
                                    </MenuList>
                                </Menu>

                            </Flex>

                        </Flex>
                    </Box>
                </SectionContainer>
            </Affix>

        </Box>

    )
}
