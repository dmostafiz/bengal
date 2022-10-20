import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import Axios from '../Helpers/axiosHelper'
import { getRedirectUrl, setAccessToken, setFlashMessage } from '../Helpers/cookieHelper'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({

    email: yup.string()
        .required('লগইন এর জন্য ইমেইল অথবা ইঊজারনেম আবশ্যক!'),

    password: yup.string()
        .required('পাসওয়ার্ড ঘরটি ফাঁকা রাখা যাবেনা।'),

}).required();

export default function useLogin() {

    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const [facebookLoading, setFLoading] = useState(false)


    const responseFacebook = (response) => {
        console.log('Facebook Login initialized')
        console.log(response);
    }

    const responseGoogle = (response) => {
        console.log('Google Login initialized')
        console.log(response);
    }

    async function onSubmit(values) {

        const res = await Axios.post('/auth/signIn', { ...values })

        console.log('Response ', res.data)

        if (res?.data?.ok) {

            toast({
                title: 'ব্লগে আপনাকে স্বাগতম!',
                // description: "ব্লগে আপনাকে স্বাগতম।",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            setAccessToken(res?.data?.accessToken)

            setFlashMessage('success', "ব্লগে আপনাকে স্বাগতম!", "")


            window.location.href = getRedirectUrl()

        }

        if (!res?.data?.ok) {
            toast({
                title: 'দুঃখিত!',
                description: res?.data?.msg ?? 'রিকুয়েস্টটি সফল হয়নি, আবার চেষ্টা করুন।',
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        }

    }


    return {responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting}
}
