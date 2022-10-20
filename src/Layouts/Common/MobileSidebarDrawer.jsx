import React from "react"
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Input, Text, useDisclosure } from "@chakra-ui/react"
import { Menu2, Power } from "tabler-icons-react"
import UserPanel from "../../Components/Common/UserPanel"
import SiteLogoDesktop from "../../Components/Common/SiteLogoDesktop"
import SiteLogoMobile from "../../Components/Common/SiteLogoMobile"
import { FaSignInAlt } from "react-icons/fa"
import useUser from "../../Hooks/useUser"
import Link from "next/link"

export default function MobileSidebarDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const { authUser, isLoading } = useUser()

    return (
        <>
            <Button borderColor={'blackAlpha.50'} ref={btnRef} colorScheme='teal' onClick={onOpen} _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }} rounded='lg' bg={'transparent'} variant='outline' colorScheme='gray'>
                <Menu2 size={24} />
            </Button>

            <Drawer
                size={'full'}
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottom={'2px'} borderColor='blackAlpha.200'>
                        <SiteLogoDesktop />

                    </DrawerHeader>

                    <DrawerBody>
                        {/* <Input placeholder='Type here...' /> */}
                    </DrawerBody>

                    <DrawerFooter bg={'gray.50'}>
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
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}