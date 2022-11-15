import React, { useEffect } from "react"
import {Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react"
import { Menu2 } from "tabler-icons-react"
import UserPanel from "../../Components/Common/UserPanel"
import SiteLogoDesktop from "../../Components/Common/SiteLogoDesktop"
import DesktopSearchbar from "../../Components/Header/DesktopSearchbar"
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

                </DrawerContent>
            </Drawer>
        </>
    )
}