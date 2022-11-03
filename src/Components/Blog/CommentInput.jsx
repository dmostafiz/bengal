import { Box, Button, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
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


const schema = yup.object({

    content: yup.string()
        // .min(10, 'কমপক্ষে ১০ টি বাক্য লিখুন।')
        .test('len', 'কমপক্ষে ২ টি বাক্য লিখতে হবে।', val => {
            const wordsArr = val?.split(' ')
            return wordsArr?.length >= 2
            //    console.log(wordsArr)
        })
        .required('মন্তব্য লিখতে হবে')

}).required();


export default function CommentInput({ replyTo, id, user }) {

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    })

    const router = useRouter()
    const toast = useToast()

    const [content, setContent] = useState('')
    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()

    const editorRef = useRef(null)

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

        // console.log('Comment Response ', res)

        if (res?.data?.ok) {
            toast({
                title: 'আপনার মন্তব্যটি সফল হয়েছে!',
                // description: "ব্লগে আপনাকে স্বাগতম।",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
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



    return (
        <Box pb={0}>

            <FormControl isInvalid={errors.content}>

                <Controller
                    name="content"
                    control={control}
                    rules={{ required: true }}

                    render={({ field: { onChange, onBlur, value, ref } }) => <Editor

                        apiKey='n07kqhwmimi936tsx8nh222m7jrwbweyy7yowcwx8gjtmyol'

                        onInit={(evt, editor) => editorRef.current = editor}

                        value={value}

                        onEditorChange={val => {
                            setContent(val)
                            onChange(val)
                        }}

                        init={{
                            placeholder: 'আপনার মন্তব্য লিখুন...',
                            height: 230,
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
                                editor.on('click', () => {
                                    if (!user) {
                                        setRedirectUrl(router.asPath)
                                        onOpen()
                                    } else {
                                        editor.contentWindow.innerHeight = 200
                                        console.log('he he he', editor)
                                    }
                                });
                            }
                        }}
                    />}
                />

                <FormErrorMessage>
                    {errors.content && errors.content.message}
                </FormErrorMessage>

            </FormControl>

            <Box my={3} />

            <Button
                ml={1}
                onClick={handleSubmit(handleSubmmitComment)}
                isLoading={loading}
                size={replyTo == 'post' ? 'md' : 'sm'}
                rounded={replyTo == 'post' ? 'md' : 'full'}
                colorScheme={replyTo == 'post' ? 'green' : 'yellow'}
            >
                {replyTo == 'post' ? 'মন্তব্য পোস্ট করুন' : 'আপনার উত্তর দিন'}
            </Button>
        </Box>
    )
}
