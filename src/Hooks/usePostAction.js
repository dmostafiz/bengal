import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Contexts/AppContext'
import { AuthModalContext } from '../Contexts/AuthModalContext'
import Axios from '../Helpers/axiosHelper'
import { setRedirectUrl } from '../Helpers/cookieHelper'
import useUser from './useUser'

export default function usePostAction() {
    const router = useRouter()
    const toast = useToast()
    const { authUser } = useUser()
    const { onOpen, onClose, setLoading, action, setAction, seDescription, setTitle, seButtonText } = useContext(AppContext)
    const authModal = useContext(AuthModalContext)

    const [url, setUrl] = useState(null)
    const [id, setId] = useState(null)
    const [type, setType] = useState(null)
    const queryClient = useQueryClient()

    const { data } = useQuery(['allSavedPost'], async () => {
        const res = await Axios.get('/user/saved_posts')
        return res.data.posts || []
    })


    const trashPost = (postId) => {
        setType('trash')
        setUrl(`/user/trash_post`)
        setId(postId)
        setTitle('ট্রাশ করুণ!')
        seDescription('আপনি পোস্টটি ট্রাশে নিতে চাচ্ছেন?')
        seButtonText('ট্রাশ করুণ')
        onOpen()
    }

    const deletePost = (postId) => {
        setType('delete')
        setUrl(`/user/delete_post`)
        setId(postId)
        setTitle('ডিলেট করুণ!')
        seDescription('আপনি পোস্টটি ডিলেট করতে চাচ্ছেন?')
        seButtonText('ডিলেট করুণ')
        onOpen()
    }

    const restorPost = (postId) => {
        setType('restore')
        setUrl(`/user/restore_post`)
        setId(postId)

        setTitle('রিস্টোর করুণ!')
        seDescription('আপনি পোস্টটি রিস্টোর করতে চাচ্ছেন?')
        seButtonText('রিস্টোর করুণ')
        onOpen()
    }

    const savePost = (postId) => {

        if (!authUser) {
            setRedirectUrl(router.asPath)
            authModal?.seTitle('পোস্ট সংরক্ষণ করতে নিবন্ধিত সদস্য হতে হবে')
            return authModal?.onOpen()
        }

        setType('save')
        setUrl(`/user/save_post`)
        setId(postId)

        setTitle('সংরক্ষণ করুণ!')
        seDescription('আপনি পোস্টটি সংরক্ষণ করতে চাচ্ছেন?')
        seButtonText('সংরক্ষণ করুণ')
        onOpen()
    }

    const removeSavePost = (postId) => {
        setType('removeSaved')
        setUrl(`/user/remove_save_post`)
        setId(postId)

        setTitle('সংরক্ষিত পোষ্টটি সরান!')
        seDescription('আপনি পোস্টটি সংরক্ষণ করতে চাচ্ছেন?')
        seButtonText('সংরক্ষণ পোষ্টটি সরান')
        onOpen()
    }

    const isPostSaved = (postId) => {

        const post = data?.find(pst => pst.postId == postId)
        if (post) return true

        return false
    }

    useEffect(() => {

        if (action === true && url && id) {

            setLoading(true)

            async function triggerAction() {

                const res = await Axios.post(url, {
                    id: id
                })

                if (res?.data?.ok) {
                    // alert('সফল হয়েছেন')
                    // queryClient.fetchQuery({ queryKey: ['publishedPosts', 'trashedPosts'] })
                    await queryClient.refetchQueries({ queryKey: ['publishedPosts'] })
                    await queryClient.refetchQueries({ queryKey: ['trashedPosts'] })
                    await queryClient.refetchQueries({ queryKey: ['draftedPosts'] })
                    await queryClient.refetchQueries({ queryKey: ['allSavedPost'] })
                    await queryClient.refetchQueries({ queryKey: ['savedPosts'] })

                    if (type == 'save') {
                        toast({
                            title: 'পোস্টটি সংরক্ষিত হয়েছে',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })

                        setType(null)
                    }
                }

                setUrl(null)
                setId(null)
                setLoading(false)

                onClose()
            }

            triggerAction()

        }

        setAction(false)

    }, [action])


    return { trashPost, deletePost, restorPost, savePost, removeSavePost, isPostSaved }
}
