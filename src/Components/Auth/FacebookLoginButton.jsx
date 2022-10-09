import { Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FacebookProvider, useLogin } from 'react-facebook';

export default function FacebookLoginButton() {

    const { login, status, isLoading, error } = useLogin();

    const [facebookLoading, setFLoading] = useState(false)

    const handleLogin = async () => {

        setFLoading(true)

        try {

            const response = await login({
                scope: 'email',
            });

            console.log(response);

        } catch (error) {

            console.log(error.message);

        }

        setFLoading(false)

    }

    return (
        <Button
            isLoading={facebookLoading}
            onClick={ handleLogin }
            mb='3'
            leftIcon={<FaFacebook size={20} />}
            colorScheme={'facebook'}
            shadow='sm'
            w='full'
            rounded={'sm'}
            gap={2}
        >
            <Text fontSize={'13px'}>ফেসবুক থেকে লগইন করুন</Text>
        </Button>

    )
}
