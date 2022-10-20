import React, { useState } from 'react'
import Axios from '../Helpers/axiosHelper'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { setFlashMessage, setUpdateToken } from '../Helpers/cookieHelper';


const schema = yup.object({
    email: yup.string()
        .email("দুঃখিত! ইমেইলটি ঠিকানাটি সঠিক নয়!")
        .required('নিবন্ধিনের জন্য ইমেইল ঠিকানাটি আবশ্যক!')
        .test(
            'checkEmailUnique',
            'দুঃখিত! ইমেইলটি আগে থেকে নিবন্ধিত!',
            async (value) => {
                const res = await Axios.post(`/user/check_user_exists`, { by: 'email', value }, {
                    withCredentials: true,
                })

                if (res?.data?.ok === true) {
                    return false
                }

                return true
            }
        ),
}).required();

export default function useRegistration() {

    const router = useRouter()
    const toast = useToast()

    const [googleLoading, setGoogleLoading] = useState(false)
    const [fbLoading, setFbLoading] = useState(false)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const responseFacebook = (response) => {
        console.log(response);
        setFbLoading(true)
    }

    const responseGoogle = async (response) => {

        const obj = response.profileObj

        console.log(obj)
        setGoogleLoading(true)

        if (obj) {
            await submitRegistrationData(
                '/auth/social_signup',
                {
                    email: obj?.email,
                    avatar: obj?.imageUrl,
                    host: 'google'
                }
            )
        }

        setGoogleLoading(false)

    }



    async function onSubmit(values) {
        console.log('Form Value', values)
        await submitRegistrationData('/auth/signUp', values)
    }

    const submitRegistrationData = async (url, values) => {
        const res = await Axios.post(url, { ...values }, {
            // withCredentials: true
        })

        // console.log(res)

        if (res?.data.ok == true) {

            // Cookies.set('profileUpdateToken', data.profileUpdateToken)
            // removeUpdateToken(data.profileUpdateToken)
            // setRedirectUrl(router.asPath)

            setUpdateToken(res?.data.profileUpdateToken)

            toast({
                title: 'নিবন্ধন সফল হয়েছে!',
                description: "আপনার নিবন্ধন সফল হয়েছে, অনুগ্রহপূর্বক আপনার প্রোফাইল এর তথ্য হালনাগাদ করুন।",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            setFlashMessage('success', "নিবন্ধন সফল হয়েছে!", "আপনার নিবন্ধন সফল হয়েছে, অনুগ্রহপূর্বক আপনার প্রোফাইল এর তথ্য হালনাগাদ করুন।",)

            window.location.href = '/acc/initial/update_profile_information'

            return

        } else {
            toast({
                title: 'দুঃখিত!',
                description: res?.data?.msg ?? 'রিকুয়েস্টটি সফল হয়নি, আবার চেষ্টা করুন।',
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            return
        }

    }


    return {responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, fbLoading, googleLoading}
}
