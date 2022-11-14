import React, { useEffect } from "react"
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
import DesktopSearchbar from "../../Components/Header/DesktopSearchbar"
import NotificationPanel from "./NotificationPanel"
import BlogPanel from "../../Components/Common/BlogPanel"
import { useRouter } from "next/router"

export default function MobileSidebarDrawer() {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        onClose()
    }, [router])

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
                    <DrawerHeader px={3} pt={0} pb={3} borderBottom={'1px'} borderColor='blackAlpha.200'>
                        <SiteLogoDesktop />

                        <DesktopSearchbar mobile={true} />

                    </DrawerHeader>


                    <DrawerBody px={0} borderTop='1px'  borderColor='blackAlpha.200'>
                        {/* <Input placeholder='Type here...' /> */}
                        <UserPanel logout isMobile={true}/>
                        <BlogPanel userPanel={false} />
                    

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