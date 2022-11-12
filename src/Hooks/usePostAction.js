import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Contexts/AppContext'
import Axios from '../Helpers/axiosHelper'

export default function usePostAction() {

    const { onOpen, onClose, setLoading, action, setAction, seDescription, setTitle, seButtonText } = useContext(AppContext)

    const [url, setUrl] = useState(null)
    const [id, setId] = useState(null)

    const queryClient = useQueryClient()


    const trashPost = (postId) => {
        setUrl(`/user/trash_post`)
        setId(postId)
        setTitle('ট্রাশ করুণ')
        seDescription('আপনি সত্যিই পোস্টটি ট্রাশে নিতে চাচ্ছেন?')
        seButtonText('ট্রাশ করুণ')
        onOpen()
    }

    const deletePost = (postId) => {
        setUrl(`/user/delete_post`)
        setId(postId)
        setTitle('ডিলেট করুণ')
        seDescription('আপনি সত্যিই পোস্টটি ডিলেট করতে চাচ্ছেন?')
        seButtonText('ডিলেট করুণ')
        onOpen()
    }

    const restorPost = (postId) => {
        setUrl(`/user/restore_post`)
        setId(postId)

        setTitle('রিস্টোর করুণ')
        seDescription('আপনি কি সত্যি পোস্টটি রিস্টোর করতে চান?')
        seButtonText('রিস্টোর করুণ')
        onOpen()
    }


    useEffect(() => {

        if (action === true && url && id) {

            setLoading(true)

            async function triggerAction() {

                const res = await Axios.post(url, {
                    id: id
                })

                if(res?.data?.ok){
                    // alert('সফল হয়েছেন')
                    // queryClient.fetchQuery({ queryKey: ['publishedPosts', 'trashedPosts'] })
                    await queryClient.refetchQueries({ queryKey: ['publishedPosts']})
                    await queryClient.refetchQueries({ queryKey: ['trashedPosts']})
                    await queryClient.refetchQueries({ queryKey: ['draftedPosts']})
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


    return { trashPost, deletePost, restorPost }
}
