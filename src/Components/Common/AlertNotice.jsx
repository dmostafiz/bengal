import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { Spoiler } from '@mantine/core'

export default function AlertNotice() {

    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })


    return (
        <Alert status='warning' shadow='sm'>

            <Box>
                <AlertTitle>
                    <Flex>
                        <AlertIcon />
                        <Text fontSize={'20px'}>সামান্তরিক বার্তা</Text>
                    </Flex>
                </AlertTitle>
                <AlertDescription>
                <Spoiler maxHeight={50} showLabel="আরও দেখুন" hideLabel="সংক্ষিপ্ত">
                    সুপ্রিয় লেখক/লেখিকা ও পাঠক সমাবেশ! সামান্তরিক ব্লগ এর পক্ষ থেকে সবাই বিনম্র ভালোবাসা এবং অন্তরস্থ শুভেচ্ছা গ্রহণ করুণ। প্রিয় লেখক/লেখিকা! সামান্তরিক ব্লগ কর্তৃপক্ষ প্রতিনিয়তই ব্লগটি সম্প্রসারণের কাজ করে যাচ্ছে। নতুন হিশেবে প্লাটফরমটিতে অনেক গুলো ফীচার ঘাটতি পরিলক্ষিত হয়েছে। আমাদের ডেভেলপার টিম এই ঘাটতি গুলো পূরণের জন্য অক্লান্ত পরিশ্রম করে যাচ্ছেন। খুব শীঘ্রই আপনারা আপনাদের ব্লগ প্যানেলে অসাধারণ কিছু নতুন ফীচার দেখতে পাবেন এবং ব্যাবহার করতে পারবেন। যেহেতু প্লাটফরমটি এখনও উন্নয়ন-আওতাধীন, সুতরাং এর ভুল-ভ্রান্তি গুলো ক্ষমাসুন্দর দৃষ্টিতে দেখবেন এবং আপনার  যেকোন সমস্যার কথা আমাদের অফিসিয়াল <a target={'_blank'} rel="noreferrer" href='https://www.facebook.com/profile.php?id=100086343406868'>ফেসবুক পেজ</a> এ মেসেজ দিয়ে জানাবেন।
                </Spoiler>
                </AlertDescription>
            </Box>
            {/* <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={() => onClose()}
            /> */}
        </Alert>
    )
}
