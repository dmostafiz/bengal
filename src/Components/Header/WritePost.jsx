import { Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Show, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { AuthModalContext } from '../../Contexts/AuthModalContext'
import { setRedirectUrl } from '../../Helpers/cookieHelper'
import useInitialBlogWriting from '../../Hooks/useInitialBlogWriting'
import useUser from '../../Hooks/useUser'

export default function WritePost() {

    const router = useRouter()
    const { onOpen, seTitle } = useContext(AuthModalContext)
    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()
    const { draftedPosts, redirectToNewPostEditor, getRedirectingUrl } = useInitialBlogWriting()

    const handleClickWriteBlog = async () => {

        if (authUser) {

            const checkDraftedPosts = await draftedPosts()

            // console.log( 'checking draftedPosts().length ', checkDraftedPosts.length)

            if (checkDraftedPosts.length > 0) {

                router.push('/editor/drafted_posts')

            } else {
                await redirectToNewPostEditor()
            }
        }

        else {
            setRedirectUrl('/write/new')

            seTitle('ব্লগ লিখতে নিবন্ধিত সদস্য হতে হবে')

            onOpen()
        }
    }


    const handleClickSerialPostWrite = async () => {

        if (authUser) {

            const checkDraftedPosts = await draftedPosts()

            // console.log( 'checking draftedPosts().length ', checkDraftedPosts.length)

            if (checkDraftedPosts.length > 0) {

                router.push('/editor/drafted_posts')

            } else {
                await redirectToNewPostEditor()
            }
        }

        else {
            setRedirectUrl('/write/new')

            seTitle('ব্লগ লিখতে নিবন্ধিত সদস্য হতে হবে')

            onOpen()
        }
    }

    return (
        <>

            <Popover variant={''}>
                <PopoverTrigger>
                    <Button
                        // onClick={() => {
                        //     setRedirectUrl(router.asPath)
                        //     seTitle('ব্লগ লিখতে নিবন্ধিত সদস্য হতে হবে')
                        //     onOpen()
                        // }}
                        size={{ base: 'xs', md: 'md' }}
                        rounded={{ base: 'none', md: 'full' }}
                        bg={{ base: 'transparent', md: 'yellow.400' }}
                        color={'blackAlpha.900'}
                        colorScheme={{ base: 'blackAlpha', md: 'yellow' }}
                    >
                        <Flex alignItems={'center'} gap={2}>
                            <BsPencilSquare size={20} /> <Show above='md'><Text>সামান্তরিকে লিখুন</Text></Show>
                        </Flex>
                    </Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent bg='yellow.400' borderColor='yellow.400' arrow mt={5} mr={3} shadow='lg'>
                        <PopoverArrow  bg='yellow.400' />
                        <PopoverHeader borderColor='blackAlpha.100'>সামান্তরিক পোর্টাল</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody borderColor='yellow.500'>
                            <Flex direction={'column'}>
                                <Button isDisabled={router.asPath.startsWith('/editor')} size={'sm'} onClick={handleClickWriteBlog} fontWeight='light' variant='unstyled'>
                                    <Flex alignItems={'center'} gap={2}>
                                        <BsPencilSquare size={18} /><Text fontSize={'17px'}>সাধারন পোস্ট লিখুন</Text>
                                    </Flex>
                                </Button>

                                <Button isDisabled={false} size={'sm'} onClick={handleClickSerialPostWrite} fontWeight='light' variant='unstyled'>
                                    <Flex alignItems={'center'} gap={2}>
                                        <BsPencilSquare size={18} /><Text fontSize={'17px'}>ধারাবাহিক পোস্ট লিখুন</Text>
                                    </Flex>
                                </Button>

                            </Flex>
                        </PopoverBody>
                        {/* <PopoverFooter>This is the footer</PopoverFooter> */}
                    </PopoverContent>
                </Portal>
            </Popover>
        </>
    )
}
