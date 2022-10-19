import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { AuthModalContext } from '../../Contexts/AuthModalContext'
import AuthComponent from './AuthComponent'

export default function AuthModal() {

    const { isOpen, onOpen, onClose, title } = useContext(AuthModalContext)


    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal size={{base: 'sm', md: 'sm'}} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded='none'>
                    <ModalHeader px={8} pb={1} fontSize={'16px'}>{title}</ModalHeader>
                    <ModalCloseButton rounded={'full'}/>
                    <ModalBody px={0}>

                        <AuthComponent px={8}/>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
