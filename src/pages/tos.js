import { Avatar, AvatarBadge, Box, Button, Center, Divider, Flex, Image, Show, SimpleGrid, Spacer, Text, Tooltip, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { ThumbUp } from 'tabler-icons-react'
import PostCard from '../Components/Common/PostCard'
import SectionContainer from '../Components/Common/SectionContainer'
import TabContainer from '../Components/HomePage/TabContainer'
import MainLeftSidebar from '../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../Layouts/Common/MainRightSidebar'
import SelectedPostsCarousel from '../Components/HomePage/SelectedPostsCarousel'
import HomeLayout from '../Layouts/HomeLayout'
import ImageBanner from '../Layouts/HomeLayout/inc/ImageBanner'
import LayoutColumn from '../Layouts/HomeLayout/LayoutColumn'
import TopBloggers from '../Components/HomePage/TopBloggers'
import StepPostsCarousel from '../Components/HomePage/StepPostsCarousel'
import { useEffect, useState } from 'react'
import req from '../Helpers/axiosHelper'
import BlogPanel from '../Components/Common/BlogPanel'
import LatestBlogPost from '../Components/HomePage/LatestBlogPost'
import SectionTitle from '../Components/Common/SectionTitle'
import TopPostsCarousel from '../Components/HomePage/TopPostsCarousel'
import { useQuery } from '@tanstack/react-query'
import Axios from '../Helpers/axiosHelper'
import banglaNumber from '../Helpers/banglaNumber'
import Link from 'next/link'
import useOnlineUser from '../Hooks/useOnlineUser'
import SliderPostCarkSkeleton from '../Components/Common/Skeletons/SliderPostCarkSkeleton'
import truncate from 'truncate-html'
import formatDate from '../Helpers/formatDate'
import AuthorHoverCard from '../Components/Common/AuthorHoverCard'
import { siteName } from '../Helpers/config'

export default function tos() {

    return (
        <HomeLayout
            title={`নীতিমালা | ${siteName}`}
        >

            <LayoutColumn

                leftSide={<MainLeftSidebar />}

                rightSide={<MainRightSidebar />}

                pageTopSection={<></>}

            >

                <Box mb={8}>

                    <SectionTitle py={2} px={3} mb={2} bg='blackAlpha.50' title='নীতিমালা' />

                    <Box fontSize={'18px'} px={{md:3}}>
                        <Text mb={3}>
                            <Text as='span' fontWeight={'bold'}>সামান্তরিক বাংলা ব্লগ</Text> এ আপনাকে স্বাগতম। <Text as='span' fontWeight={'bold'}>"সামান্তরিক"</Text> এ নিবন্ধন করার সময় এর <Text as='span' fontWeight={'bold'}>‘নীতিমালা’</Text>পড়ে নিন। <Text as='span' fontWeight={'bold'}>‘সামান্তরিক’</Text>‘সামান্তরিক’-এ কেউ নিবন্ধন করলে ধরে নেওয়া হবে তিনি ‘নীতিমালা’ পড়েছেন এবং তাতে সম্মতি জ্ঞাপন করেছেন (নিবন্ধনের সময় আপনি Tos মেনে নিয়েছেন)। প্রকাশিত লেখার বক্তব্য, মত ও স্বত্ব লেখকের নিজস্ব। এখানে প্রকাশিত লেখার আইনগত বা অন্য কোনো দায়দায়িত্ব সামান্তরিক কর্তৃপক্ষ বহন করে না। সামান্তরিক এর উদ্দেশ্য মত প্রকাশের পরিসর বাড়ানো, সৃষ্টিশীলতাকে উৎসাহ দেওয়া, লেখক-পাঠক যোগাযোগের মাত্রা প্রসারিত করা। আমরা আশা করি, ‘নীতিমালা’ মেনে ইতিবাচকভাবে এসব সুযোগ ব্যবহার করবেন।
                        </Text>

                        <Box mb={3}>
                            <Text fontWeight={'bold'} fontSize='20px'>সামান্তরিক ব্লগ  এর মতাদর্শঃ</Text>
                            <Text>
                                * সামান্তরিক ব্লগ দৃঢ় ভাবে বিশ্বাস করে আমরা জাতি হিসেবে বাঙ্গালী এবং নাগরিকতায় বাংলাদেশী।
                            </Text>
                            <Text>
                                * সামান্তরিক ব্লগ বিশ্বাস করে , এই দেশের সকল ধর্মের মানুষের সমান অধিকার। যে যার ধর্ম পালন করবে। একে অন্যের ধর্মের উপর জোর জবরদস্তি করবে না।
                            </Text>
                            <Text>
                                * সামান্তরিক ব্লগ ধর্মীয় মৌলবাদকে ঘৃণা করে। ধর্মের নামে জঙ্গিবাদ সমর্থন করে না। তেমনি এই ব্লগ নাস্তিকতা প্রচারের কোন প্লাটফরম নয়।নাস্তিকতা প্রচারে কোন ধর্মের অনুসারীগণ তাঁদের অনুভূতিতে আঘাত প্রাপ্ত হন,এমন কাজ বা লেখা এই ব্লগ সমর্থন করে না।
                            </Text>
                        </Box>


                        <Text fontWeight={'bold'} fontSize='20px'>নীতিমালাঃ</Text>
                        
                        <Text>
                            * বাংলাদেশে প্রচলিত আইন লঙ্ঘন করে কোনো লেখা প্রকাশ করা যাবে না।
                        </Text>
                     
                        <Text>
                            * মহান স্বাধীনতা যুদ্ধ , মুক্তিযোদ্ধা সম্পর্কে সামান্য সমালোচনা গ্রহন করা হবে না। বাংলাদেশের মুক্তিযুদ্ধ, স্বাধীনতা ও সার্বভৌমত্ব নিয়ে অবমাননা ও কটাক্ষমূলক কোনো লেখা প্রকাশ করা যাবে না।
                        </Text>
                    
                        <Text>
                            * কোনো লেখার মাধ্যমে আন্তর্জাতিকভাবে প্রচলিত আইন লঙ্ঘন করা যাবে না।
                        </Text>
                        
                        <Text>
                            * আপনাকে অবশ্যই বাংলাতে পোষ্ট ও মন্তব্য করতে হবে এবং অবশ্যই ইউনিকোড ব্যাবহার করে লিখতে হবে।
                        </Text>
                       
                        <Text>
                            * সঠিক বিভাগে আপনার লেখা পোষ্ট করার চেষ্টা করুন।
                        </Text>
                       
                        <Text>* কর্তৃপক্ষ আপনার লেখা প্রয়োজনবোধে সম্পাদনা, স্থানান্তর এবং মুছে দেবার অধিকার সংরক্ষণ করে।</Text>
                      
                        <Text>* কপিরাইটের ব্যাপারে সচেতন থাকুন। কপিরাইট আছে এমন কিছু পোস্ট করতে চাইলে এ সম্পর্কিত নিয়ম মেনে চলুন। অন্যের লেখা বা ছবি কোন সুত্র ব্যতীত পোস্ট করা অপরাধ বলে গন্য করা হবে। যে কোন কপি পেস্ট উপযুক্ত রেফারেন্স ছাড়া এবং ব্লগারের নিজের কোন বিশ্লেষণ ছাড়া পোস্ট হলে , পরবর্তীতে প্রমান পাওয়া গেলে তা মুছে ফেলা হবে। একই অপরাধ দ্বিতীয়বার করলে পোষ্ট দাতাকে বহিষ্কার করা হবে।</Text>
                      
                        <Text>* কাউকে ব্যাক্তিগত আঘাত করা থেকে বিরত থাকুন।</Text>
                     
                        <Text>* কোন অশ্লীল লেখা, ছবি , ভিডিও কোন ব্লগার পোস্ট করলে , বা  মন্তব্যে কোন অশ্লীল শব্দ , বাক্য ,ছবি , ভিডিও ব্যবহার করলে , কোন ধরনের সুযোগ না দিয়ে সেই ব্লগারকে বহিষ্কার করা হবে।</Text>
                      
                        <Text>* নারীদের সম্পর্কে আজে-বাজে মন্তব্য বা নারীদের নিচু করে কোনো পোস্ট দেয়া যাবে না। কোনো ব্লগারকে আঘাত করে কোন পোষ্ট বা মন্তব্য করা হলে প্রমাণ সাপেক্ষে পোষ্ট দাতা বা মন্তব্যকারী কে কোনো ধরনের সুযোগ না দিয়ে বহিষ্কার করা হবে।</Text>
                        
                        <Text>* নিজের লেখায় অন্যদের মন্তব্যের জবাব দেওয়ার পাশাপাশি অন্যান্য ব্লগারদের লেখায় গঠনমূলক মন্তব্য করতে হবে।</Text>

                        <Text>* কোন হত্যাকাণ্ডকে সমর্থন করা, ধর্মীয় অনুভূতিকে আঘাত করা, নিষিদ্ধ ঘোষিত কোন সংগঠনের পক্ষে-বিপক্ষে প্রচারণা চালানো হলে পোষ্ট কোন নোটিশ ছাড়াই মুছে দেয়া হবে এবং সংশ্লিষ্ট ব্লগারের ব্লগীং সুবিধা বাতিল করা হবে।</Text>

                        <Text>* ধর্মগ্রন্থের বাণী ত্রুটিপূর্ণভাবে উদ্ধৃত করা যাবে না। এমনভাবে ধর্মগ্রন্থের বাণী উদ্ধৃত করা যাবে না, যাতে ধর্ম বা বাণীর অসম্মান হয়। প্রচলিত ধর্মীয় ও সামাজিক মূল্যবোধ অনুসারে শ্রদ্ধেয় কোনো ব্যক্তিকে হেয় করে কোনো মন্তব্য করা যাবে না।</Text>

                        <Text>* ইউজার নাম পরিবর্তন করা যাবে না। একাধিক ইউজার নেম ব্যবহার করে কোন প্রকার অস্থিতিশীল পরিস্থিতি পরিবেশ সৃষ্টি করলে তার বিরুদ্ধে কর্তৃপক্ষ যথাযথ ব্যবস্থা গ্রহন করবে।</Text>

                        <Text>* সমাজে বিভ্রান্তি সৃষ্টি করতে পারে বা প্রচলিত আইনে অপরাধ বলে গণ্য হয় এমন কোনও কাজের সমর্থনে দেওয়া পোষ্ট সরিয়ে দেওয়া হবে।</Text>

                        <Text>সামান্তরিক ব্লগ কতৃপক্ষ মনে করলে এক লাইনের বা একটি মাত্র ছবি দিয়ে অর্থহীন/বক্তব্যহীন/অযৌক্তিক পোষ্ট প্রথম পাতা থেকে সরিয়ে দিতে পারে।</Text>

                        <Text>* ভিন্ন দল ও মতের প্রতি সম্মান প্রদর্শন করতে হবে। গালাগালি পূর্ণ পোষ্ট বা মন্তব্য বিনা নোটিশে মুছে দেওয়া হবে।</Text>

                        <Text>* কোন ব্লগার বিজ্ঞাপনমুলক প্রচারণা করলে, তার পোষ্ট হতে বিজ্ঞাপন / পোষ্ট মুছে দেয়া হতে পারে এমনকি তার ব্লগীং সুবিধা বাতিল হয়ে যাবে। বিজ্ঞাপন বলতে কোন পন্য, সেবা বা সোনেলা ব্লগ ব্যাতীত অন্য কোন সাইটের প্রচারনা বুঝাবে।</Text>

                        <Text>* কোন লেখার মাঝে কোন ব্লগার তার ব্যক্তিগত ব্লগের লিংক দিতে পারবেন না।</Text>

                        <Text>* কোন ব্লগার তার লেখা বা কোন মন্তব্যে তার ফেইসবুক, টুইটার বা মেইল এর লিংক দিতে পারবে না। সামান্তরিক ব্লগ কারো ব্যক্তিগত যোগাযোগের মাধ্যম নয়।</Text>

                        <Text>* সামান্তরিক ব্লগে প্রকাশিত যে কোন ব্লগারের লেখার সকল দায়-দায়িত্ব পোস্ট দাতা ব্লগারের নিজের। সামান্তরিক ব্লগে প্রকাশিত ব্লগারদের লেখা সম্পর্কিত কোন দ্বায়-দায়িত্ব বহন করবে না।</Text>

                        <Text>* কোনো ব্লগারের অবৈধ বা বেআইনি কর্মকাণ্ডের জন্য যদি "সামান্তরিক" মামলার সম্মুখীন হয় তবে মামলার সম্পূর্ণ খরচ উক্ত ব্লগারকে বহন করতে হবে।</Text>
                    </Box>

                </Box>


            </LayoutColumn>

        </HomeLayout>
    )
}
