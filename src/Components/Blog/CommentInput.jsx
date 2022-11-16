import { Box, Button, Flex, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { AuthModalContext } from '../../Contexts/AuthModalContext';
import useUser from '../../Hooks/useUser';
import Axios from '../../Helpers/axiosHelper';
import axios from 'axios';
import { setRedirectUrl } from '../../Helpers/cookieHelper';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CommentContext } from '../../Contexts/CommentContext';


const schema = yup.object({

    content: yup.string().required('মন্তব্য লিখুন')

}).required();


export default function CommentInput({ openOnReply = false, replyTo, id, user }) {

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    })

    const {setCommentLoading, setCommentId, currentReplyThread, setCurrentReplyThread, setCommentChildren } = useContext(CommentContext)

    const router = useRouter()
    const toast = useToast()

    const [content, setContent] = useState('')
    const { onOpen, seTitle } = useContext(AuthModalContext)

    const example_image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {

        console.log('TinnyMce User: ', user)
        if (!user) {
            setRedirectUrl(router.asPath)
            seTitle('লগইন / নিবন্ধন করুন')
            onOpen()

            reject('শুধুমাত্র নিবন্ধিত সদস্যরাই ছবি আপলোড করতে পারবেন');
        }

        const reader = new FileReader();

        reader.readAsDataURL(blobInfo.blob())

        reader.onloadend = () => {

            Axios.post('/post/image_upload', { image: reader.result })
                .then(res => {
                    // console.log('image upload success ', res.data)
                    resolve(res.data.location);

                })
                .catch(err => {
                    console.log('File upload err', err.message)
                })

        }

    });

    const [loading, setLoading] = useState(false)

    const handleSubmmitComment = async (value) => {

        setLoading(true)

        const res = await Axios.post('/post/store_comment', {
            content,
            replyTo,
            id
        })

        setCommentLoading(id)
        // console.log('Comment Response ', res)

        if (res?.data?.ok) {
            if (openOnReply) {
                setCommentChildren(id)
            }
            setCommentId(res?.data?.comment?.id)

            // toast({
            //     title: 'আপনার মন্তব্যটি সফল হয়েছে!',
            //     // description: "ব্লগে আপনাকে স্বাগতম।",
            //     status: 'success',
            //     position: 'top-right',
            //     duration: 9000,
            //     isClosable: true,
            // })

            setCurrentReplyThread({
                showEditor: false,
                commentId: null
            })

            setContent('')

            reset({
                content: ''
            })

        } else {
            toast({
                title: res?.data?.msg,
                // description: "ব্লগে আপনাকে স্বাগতম।",
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        }

        setLoading(false)
    }

    const editorRef = useRef(null)


    return (
        <Box pb={0}>

            <FormControl isInvalid={errors.content}>

                <Controller
                    name="content"
                    control={control}
                    rules={{ required: true }}

                    render={({ field: { onChange, onBlur, value, ref } }) => <Editor

                        apiKey='n07kqhwmimi936tsx8nh222m7jrwbweyy7yowcwx8gjtmyol'

                        // ref={editorRef}

                        onInit={(evt, editor) => {
                            editorRef.current = editor
                            if (currentReplyThread.showEditor) {
                                editor.focus()
                            }
                        }}

                        value={value}

                        onEditorChange={val => {

                            if (!user) {
                                setRedirectUrl(router.asPath)
                                return onOpen()
                            }else{
                                setContent(val)
                                onChange(val)
                            }

                        }}

                        init={{
                            placeholder: replyTo == 'post' ? 'আপনার মন্তব্য লিখুন...' : 'আপনার উত্তর লিখুন...',
                            height: replyTo == 'post' ? 230 : 150,
                            width: '100%',
                            // resize: true,
                            menubar: false,
                            skin: 'oxide',
                            statusbar: false,
                            language: 'bn_BD',
                            language_url: '/lang/tinny/bn_BD.js',

                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'emoticons'
                            ],
                            toolbar: 'bold underline link emoticons',
                            block_formats: 'Paragraph=p; প্যারাগ্রাফ হেডিং=h3',
                            br_in_pre: true,
                            images_upload_handler: example_image_upload_handler,
                            images_file_types: 'jpg,svg,webp,png,jpeg,gif',
                            content_style: 'img { width: 100%; height: auto }',
                            setup: (editor) => {
                                // editor.on('init', () => {
                                //     editor.focus()
                                // })
                                editor.on('click', () => {
                                    if (!user) {
                                        seTitle('মন্তব্য করতে লগইন করুণ!')

                                        setRedirectUrl(router.asPath)
                                        return onOpen()
                                    } else {
                                        // editor.contentWindow.innerHeight = 200
                                        // console.log('he he he', editor)
                                    }
                                });
                            }
                        }}
                    />}
                />

                {/* <FormErrorMessage>
                    {errors.content && errors.content.message}
                </FormErrorMessage> */}

            </FormControl>

            <Box my={3} />

            <Flex gap={1}>
                <Button
                    ml={1}
                    onClick={handleSubmit(handleSubmmitComment)}
                    isLoading={loading}
                    size={replyTo == 'post' ? 'md' : 'sm'}
                    rounded={replyTo == 'post' ? 'md' : 'md'}
                    colorScheme={replyTo == 'post' ? 'green' : 'blue'}
                >
                    {replyTo == 'post' ? 'মন্তব্য পোস্ট করুন' : 'উত্তর পোস্ট করুন'}
                </Button>

                {replyTo == 'reply' && <Button
                    ml={1}
                    onClick={() => setCurrentReplyThread({ showEditor: false, commentId: null })}
                    size={'sm'}
                    rounded={'md'}
                    colorScheme={'gray'}
                >
                    বন্ধ করুণ
                </Button>}


            </Flex>

        </Box>
    )
}
