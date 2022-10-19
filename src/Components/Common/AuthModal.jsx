import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { AuthModalContext } from '../../Contexts/AuthModalContext'
import AuthComponent from './AuthComponent'

export default function AuthModal() {

    const { isOpen, onOpen, onClose, title } = useContext(AuthModalContext)


    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal blockScrollOnMount={false} size={{base: 'sm', md: 'sm'}} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay zIndex={999} />
                <ModalContent rounded='md' zIndex={9999999999999}>
                    <ModalHeader px={3} pb={1} fontSize={'17px'}>{title}</ModalHeader>
                    <ModalCloseButton rounded={'full'}/>
                    <ModalBody px={0}>

                        <AuthComponent px={7}/>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
