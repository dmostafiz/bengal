import { Center, Spinner, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { authorizeUpdateToken, getUpdateToken } from '../Helpers/cookieHelper'

export default function LayoutWrapper({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    (

      async () => {

        const redirect = await authorizeUpdateToken()

        if (redirect && !router.asPath.startsWith('/acc/initial')) {
          router.push(redirect)
        } else {

          // setLoading(false)
        }

      }

    )()


    setLoading(false)

  }, [])

  return (
    <>
      {!loading ? children : <Center h='100vh'>
        {/* <Spinner color='yellow.500' size='xl' /> */}
        {/* <Text color={'white'}>Loading...</Text> */}
      </Center>}
    </>
  )
}
