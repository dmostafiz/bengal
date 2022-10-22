import { Box, Divider, Spacer } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'
import SingleLoginComponent from '../Components/Auth/SingleLoginComponent'
import AuthComponent from '../Components/Common/AuthComponent'
import ComponentLoader from '../Components/Common/ComponentLoader'
import useUser from '../Hooks/useUser'

export default function AuthWrapper({ children, loading = false, component = null }) {

    const { asPath } = useRouter()
    const { isLoading, authUser } = useUser()

    return (
        <>
            {(loading && isLoading)

                ? <ComponentLoader py='100' size='xl' />

                : (!isLoading && authUser)

                    ? children

                    : component && component
            }
        </>
    )
}
