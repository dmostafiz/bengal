import { Button, HStack, IconButton, Text, Tooltip, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { BsTelegram } from 'react-icons/bs';
import { FaFacebook, FaLinkedin, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'

export default function SocialShareButtons({ link, popup = true, title = '' }) {

    function openShareWindow(url) {

        const shareUrl = url + window.location.protocol + '//' + window.location.hostname + link
        console.log('Share Url: ', shareUrl)

        var w = 600
        var h = 600
        var y = window.outerHeight / 2 + window.screenY - (h / 2)
        var x = window.outerWidth / 2 + window.screenX - (w / 2)

        var newWin  = window.open(shareUrl, 'newwin', popup ? 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + y + ', left=' + x : null);

        if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
            //POPUP BLOCKED
            indow.open(shareUrl, 'newwin')
        }
    }

    const fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u='
    const twitterShareUrl = 'https://twitter.com/intent/tweet?url='
    const linkedInShareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url='
    const whatsappShareUrl = 'https://api.whatsapp.com/send?text='
    const telegramShareUrl = 'https://t.me/share/url?url='

    return (
        <Wrap>

            <Tooltip hasArrow label={'ফেসবুকে শেয়ার করুন'} bg='gray.800'>
                <Button onClick={() => openShareWindow(`${fbShareUrl}`)} gap={0} pr={3} size='xs' rounded={'sm'} colorScheme='facebook' leftIcon={<FaFacebook />}>
                    ফেসবুক শেয়ার
                </Button>
            </Tooltip>


            <Tooltip hasArrow label={'টুইটারে শেয়ার করুন'} bg='gray.800'>
                <IconButton onClick={() => openShareWindow(`${twitterShareUrl}`)} size={'xs'} rounded='sm' colorScheme='twitter' icon={<FaTwitter />} />
            </Tooltip>

            <Tooltip hasArrow label={'লিংকড-ইন এ শেয়ার করুন'} bg='gray.800'>
                <IconButton icon={<FaLinkedin />} onClick={() => openShareWindow(`${linkedInShareUrl}`)} size={'xs'} rounded='sm' colorScheme='linkedin' />
            </Tooltip>

            <Tooltip hasArrow label={'টেলিগ্রামে শেয়ার করুন'} bg='gray.800'>
                <IconButton icon={<FaTelegram />} onClick={() => openShareWindow(`${telegramShareUrl}`)} size={'xs'} rounded='sm' colorScheme='telegram' />
            </Tooltip>

            <Tooltip hasArrow label={'হটসআপে শেয়ার করুন'} bg='gray.800'>
                <IconButton icon={<FaWhatsapp />} onClick={() => openShareWindow(`${whatsappShareUrl}`)} size={'xs'} rounded='sm' colorScheme='whatsapp' />
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
