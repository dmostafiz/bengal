import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import Axios from '../Helpers/axiosHelper'
import { getRedirectUrl, setAccessToken, setFlashMessage, setUpdateToken } from '../Helpers/cookieHelper'
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


    const [googleLoading, setGoogleLoading] = useState(false)
    const [fbLoading, setFbLoading] = useState(false)


    const responseFacebook = async (response) => {

        console.log('FaceBook Signup ', response)


        setFbLoading(true)


        if (response?.email) {

            await submitLoginData('/auth/social_signin', {
                email: response?.email

            })
        }

        setFbLoading(false)
    }

    const responseGoogle = async (response, errorNotify = true) => {

        setGoogleLoading(true)

        const obj = response.profileObj

        if (obj) {

            const loginStatus = await submitLoginData('/auth/social_signin', {
                email: obj?.email

            }, errorNotify)

            setGoogleLoading(false)
            
            return loginStatus
        }
        else
        {
            setGoogleLoading(false)
            return false
        }
        

    }

    async function onSubmit(values) {
        await submitLoginData('/auth/signIn', values)
    }


    async function submitLoginData(url, values, errorNotify = true) {

        const res = await Axios.post(url, { ...values })

        console.log('Response ', res.data)

        if (res?.data?.ok) {

            if(res?.data?.type == 'update'){

                setUpdateToken(res?.data.profileUpdateToken)

                toast({
                    title: 'আপনার প্রোফাইল হালনাগাদ করুন',
                    // description: "আপনার নিবন্ধন সফল হয়েছে, অনুগ্রহপূর্বক আপনার প্রোফাইল এর তথ্য হালনাগাদ করুন।",
                    status: 'success',
                    position: 'top-right',
                    duration: 9000,
                    isClosable: true,
                })
    
                setFlashMessage('success', "আপনার প্রোফাইল হালনাগাদ করুন", "")
    
                window.location.href = '/acc/initial/update_profile_information'
                return
            }

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

            if (errorNotify) {

                toast({
                    title: 'দুঃখিত!',
                    description: res?.data?.msg ?? 'রিকুয়েস্টটি সফল হয়নি, আবার চেষ্টা করুন।',
                    status: 'error',
                    position: 'top-right',
                    duration: 9000,
                    isClosable: true,
                })
                
            }


            return false

        }
    }



    return { responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, googleLoading, fbLoading }
}
