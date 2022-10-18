import { Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { authorizeUpdateToken, getUpdateToken } from '../Helpers/cookieHelper'

export default function InitialUpdatePageWrapper({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    (

      async () => {
        const redirect = await authorizeUpdateToken()

        if (!redirect && router.asPath.startsWith('/acc/initial')) {
          window.location.href = '/'
        } else {

          setLoading(false)
        }

      }


    )()


  }, [router])

  return (
    <>
      {!loading ? children : <Center h='100vh'>
        {/* <Spinner color='yellow.500' size='xl' /> */}
        {/* <Text color={'white'}>Loading...</Text> */}
      </Center>}
    </>
  )
}
