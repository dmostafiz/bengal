import { Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { authorizeUpdateToken } from '../Helpers/cookieHelper'

export default function LayoutWrapper({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    (

      async () => {

        const data = await authorizeUpdateToken()

        if (data?.redirectUrl && !router.asPath.startsWith('/acc/initial')) {
          router.push(data?.redirectUrl)
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
