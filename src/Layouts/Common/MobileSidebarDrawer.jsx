import React from "react"
import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Icon, Input, Text, useDisclosure } from "@chakra-ui/react"
import { BellOff, Menu2, Power } from "tabler-icons-react"
import UserPanel from "../../Components/Common/UserPanel"
import SiteLogoDesktop from "../../Components/Common/SiteLogoDesktop"
import SiteLogoMobile from "../../Components/Common/SiteLogoMobile"
import { FaBell, FaSignInAlt } from "react-icons/fa"
import useUser from "../../Hooks/useUser"
import Link from "next/link"
import { IconChevronRight } from "@tabler/icons"
import { NavLink } from "@mantine/core"

export default function MobileSidebarDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { authUser, isLoading } = useUser()

    return (
        <>
            <Button borderColor={'blackAlpha.50'} colorScheme='teal' onClick={onOpen} _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }} rounded='lg' bg={'transparent'} variant='outline'>
                <Menu2 size={24} />
            </Button>

            <Drawer
                size={'full'}
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent h={'100vh'}>
                    <DrawerCloseButton />
                    <DrawerHeader py={0} borderBottom={'1px'} borderColor='blackAlpha.200'>
                        <SiteLogoDesktop />
                    </DrawerHeader>


                    <UserPanel logout/>

                    <DrawerBody borderTop='1px'  borderColor='blackAlpha.200'>
                        {/* <Input placeholder='Type here...' /> */}

                        <NavLink
                            label={<Text fontSize={'17px'} fontWeight={500}>নোটিফিকেশন</Text>}
                            // description={<Text as='' fontSize={'12px'} color='blackAlpha.600'><strong>@{authUser.userName}</strong> ( {authUser.followers.length} জন অনুসারন করছে )</Text>}
                            icon={<FaBell />}
                            rightSection={<IconChevronRight size={12} stroke={1.5} />}
                            // active
                            // variant="filled"

                            variant="light"
                            color={'light'}
                        >
                            <Box width={'full'}>
                                <Flex py={5}>
                                    <Icon as={BellOff} color={'blackAlpha.500'} fontSize={'26px'} />  <Text color={'blackAlpha.500'}>কোন নোটিফিকেশন পাওয়া যায়নি</Text>
                                </Flex>
                            </Box>

                            {/* <NavLink icon={<User />} label="প্রোফাইল" />
                            <NavLink icon={<Pencil />} label="আমার লিখাসমূহ" />
                            <NavLink icon={<Heart />} label="আমার পছন্দ তালিকা" /> */}
                            {/* {logout && <NavLink onClick={logoutUser} icon={<Power />} label="লগ-আউট" />} */}
                        </NavLink>


                    </DrawerBody>

                    {/* <DrawerFooter borderTop={'2px'} borderColor='blackAlpha.200'>
                        {(!isLoading && !authUser) ? <Flex w={'full'}>
                            <Link href={'/auth/login'}>
                                <Button flex='1' variant='outline' mr={3}>
                                    <Flex alignItems='center' gap={2}>
                                        <Power /> <Text> লগইন করুন</Text>
                                    </Flex>
                                </Button>
                            </Link>

                            <Link href={'/auth/create_acc'}>
                                <Button flex='1' variant='outline'>
                                    <Flex alignItems='center' gap={2}>
                                        <FaSignInAlt /> <Text> নিবন্ধন করুন</Text>
                                    </Flex>
                                </Button>
                            </Link>

                        </Flex> : <Box w='full'>
                            <UserPanel logout={true} />
                        </Box>}
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
    )
}