import { Button, HStack, Text, Tooltip, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { BsTelegram } from 'react-icons/bs';
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'

export default function SocialShareButtons({ link, popup=true, title='' }) {

    function openShareWindow(url) {

        const shareUrl = url + window.location.protocol + '//' + window.location.hostname + link
        console.log('Share Url: ', shareUrl)

        window.open(shareUrl, 'newwin', popup ? 'width=600px,height=600px' : null);
    }

    const fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u='
    const twitterShareUrl = 'https://twitter.com/intent/tweet?url='
    const linkedInShareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url='
    const whatsappShareUrl = 'https://api.whatsapp.com/send?text='
    const telegramShareUrl = 'https://t.me/share/url?url='

    return (
        <Wrap>

            <Tooltip hasArrow label={'ফেসবুকে শেয়ার করুন'} bg='gray.800'>
                <Button onClick={() => openShareWindow(`${fbShareUrl}`)} size='xs' rounded={'none'} colorScheme='facebook' leftIcon={<FaFacebook />}>
                    Facebook
                </Button>
            </Tooltip>


            <Tooltip hasArrow label={'টুইটারে শেয়ার করুন'} bg='gray.800'>
                <Button onClick={() => openShareWindow(`${twitterShareUrl}`)} size={'xs'} rounded='none' colorScheme='twitter' leftIcon={<FaTwitter />}>
                    Twitter
                </Button>
            </Tooltip>

            <Tooltip hasArrow label={'লিংকড-ইন এ শেয়ার করুন'} bg='gray.800'>
                <Button onClick={() => openShareWindow(`${linkedInShareUrl}`)} size={'xs'} rounded='none' colorScheme='linkedin' leftIcon={<FaLinkedin />}>
                    Linked In
                </Button>
            </Tooltip>

            {/* <Tooltip hasArrow label={'টেলিগ্রামে শেয়ার করুন'} bg='gray.800'>
                <Button onClick={() => openShareWindow(`${telegramShareUrl}`)} size={'xs'} rounded='none' colorScheme='telegram' leftIcon={<BsTelegram />}>
                    Telegram
                </Button>
            </Tooltip>

            <Tooltip hasArrow label={'হটসআপে শেয়ার করুন'} bg='gray.800'>
                <Button onClick={() => openShareWindow(`${whatsappShareUrl}`)} size={'xs'} rounded='none' colorScheme='whatsapp' leftIcon={<FaWhatsapp />}>
                    Whatsapp
                </Button>
            </Tooltip> */}

        </Wrap>
    )
}
