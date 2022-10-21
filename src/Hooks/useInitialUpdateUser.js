import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { authorizeUpdateToken } from '../Helpers/cookieHelper'

export default function useInitialUpdateUser() {
    
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [avatar, setAvatar] = useState(null)
    const [email, setEmail] = useState(null)

    useEffect(() => {

        (

            async () => {
                const data = await authorizeUpdateToken()

                setAvatar(data.avatar)
                setEmail(data.email)

                if (!data?.redirectUrl && router.asPath.startsWith('/acc/initial')) {
                    window.location.href = '/'
                } else {

                    setLoading(false)
                }

            }


        )()

    }, [router])

    return { loading, avatar, email}
}
