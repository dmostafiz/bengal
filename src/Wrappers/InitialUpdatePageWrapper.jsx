import { Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { authorizeUpdateToken, getUpdateToken } from '../Helpers/cookieHelper'
import useInitialUpdateUser from '../Hooks/useInitialUpdateUser'

export default function InitialUpdatePageWrapper({ children }) {

  const {loading} = useInitialUpdateUser()

  return (
    <>
      {!loading ? children : <Center h='100vh'>
        {/* <Spinner color='yellow.500' size='xl' /> */}
        {/* <Text color={'white'}>Loading...</Text> */}
      </Center>}
    </>
  )
}
