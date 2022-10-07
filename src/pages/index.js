import { Avatar, Box, Center, Divider, Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react'
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

export default function Home() {
  return (
    <HomeLayout>

      <LayoutColumn

        leftSide={<MainLeftSidebar />}

        rightSide={<MainRightSidebar />}

      >

        {/* <ImageBanner src='/banner.png' /> */}

        {/* <Box mb={8}></Box> */}

        <Box mb={8} w='full' overflow={'hidden'}>
          {/* <Box py={2} rounded='none' shadow='sm'>
            <Title order={3}>বাছাইকৃত পোস্ট</Title>
          </Box> */}

          {/* <Spacer h={5} /> */}

          <TabContainer childrens={[
            {
              title: 'বাছাইকৃত পোস্ট',
              component: <SelectedPostsCarousel />
            },

            {
              title: 'ধারাবাহিক প্রকাশনী',
              component: <SelectedPostsCarousel />
            },

            {
              title: 'মাস সেরা ব্লগার',
              component: <SelectedPostsCarousel />
            },

          ]} />


        </Box>


        <Box mb={8}>
          <Box py={2} bg={''} fontWeight='bold' rounded='sm'>
            <Title order={3}>সাম্প্রতিক পোস্ট (ক্রমানুসারে)</Title>
          </Box>

          <VStack gap={1}>
            <PostCard
              title="ফলের নাম না বলায় পুরো বাজারের ফল ট্রাক ভরে মায়ের জন্য নিয়ে এলেন ডিপজল"
              image='https://s3.amazonaws.com/somewherein/pictures/balchirabongal/balchirabongal-1664883109-9202d32_xlarge.jpg'
              content='পর্দায় যেমনই থাকুক না কেন, বাস্তব জীবনে হিরোর ভূমিকায় দেখা গেছে তাকে। বিভিন্ন সময়ে ডিপজলের সেবামূলক কাজের কথাও উঠে আসে। তবে তিনি তার মাকে প্রচন্ড ভালোবাসতেন। তার কাছের অনেকেই এমন কথা বলেন। কমেডি অভিনেতা জ্যাকি আলমগীর জানালেন, ডিপজল সাহেব প্রচন্ড মা ভক্ত। মায়ের প্রতি ডিপজলের ভালোবাসার কথা জানিয়ে জ্যাকি...'
              createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
              states={{
                read: 5,
                comment: 3,
                like: 3
              }}
              author={{
                name: 'লিমন লস্কর',
                image: ''
              }}
            />

            <PostCard
              title="বান্দুরা রানী পবিত্র জপমালা গীর্জা"
              image='https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg'
              content='ঢাকা থেকে মাত্র ১ ঘন্টা ৩০ মিনিটের দূরর্ত্বে নবাবগঞ্জে খ্রীষ্টান আদিনিবাস। এই নাবাগঞ্জে রয়েছে ধর্মীয় বিচিত্রতা ও সহবস্থান। রয়েছে প্রায় চারশ বছরের পুরান ভাঙ্গা মসজিদ ও প্রায় ২৪০ বছরের পূরান  "রানী পবিত্র জপমালা গীর্জা" যা বান্দুরা গীর্জা নামেও বহুল পরিচিত...'
              createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
              states={{
                read: 5,
                comment: 3,
                like: 3
              }}
              author={{
                name: 'লিমন লস্কর',
                image: ''
              }}
            />


            <PostCard
              title="বয়স শেষ করা বিদ্যালয়ে আমরা..../"
              // image='https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg'
              content='মাত্র এগারো বছর বয়সে ইনভেস্ট শুরু করে সতের বছর বয়সে ৪২ লাখ টাকার মালিক ওয়ারেন বাফেট টাইপ হতে হলে ২৫ বছরে বাপের টাকায় গ্রাজুয়েট কমপ্লিট করে ৩০ বছর পর্যন্ত সরকারি চাকরির পিছনে দৌড়ে হওন যাইবো না,...'
              createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
              states={{
                read: 5,
                comment: 3,
                like: 3
              }}
              author={{
                name: 'লিমন লস্কর',
                image: ''
              }}
            />

            <PostCard
              title="রাম ও কৃষ্ণ - মানুষের কাছে পাঠানো নবী ছিলেন?"
              image='https://s3.amazonaws.com/somewherein/pictures/shaiyan/shaiyan-1664874752-d595450_xlarge.jpg'
              content='যদি প্রমাণ করা যায় যে- রাম ও কৃষ্ণ ছিলেন মানুষের কাছে প্রেরিত ১ লক্ষ ২৪ হাজার নবীদের মাঝে দুইজন নবী, তাহলে আমাদের মাঝে ঐক্য ফিরে আসবে না? তাতে বাধা কোথায়? ভারতবর্ষের অনেক ইসলামী ব্যক্তিত্ব মনে করেন যে- রাম, কৃষ্ণ এবং শিব ইসলামের প্রেরিত পুরুষ ছিলেন। তেমনই একজন ইসলামী...'
              createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
              states={{
                read: 5,
                comment: 3,
                like: 3
              }}
              author={{
                name: 'লিমন লস্কর',
                image: ''
              }}
            />

            <PostCard
              title="জনপ্রতিনিধিদের জবাবদিহিতাহীন এই সংস্কৃতি আরও কত বছর চলবে?"
              image='https://s3.amazonaws.com/somewherein/pictures/SabbirShakil666/SabbirShakil666-1664873600-089caf6_xlarge.jpg'
              content='এদেশের কনস্টিটিউশন অনুযায়ী পাঁচ বছর পরপর ভোটের মাধ্যমে জনপ্রতিনিধি, সরকার গঠন করার নিয়ম । কিন্তু পুরো পাঁচ বছর কেটে গেলেও এদেশের সব এলাকাতে জনপ্রতিনিধি আর জনতার মুখোমুখি কোনো সেমিনার/সিম্পোজিয়াম/প্রোগ্রাম করা হয়? সোজাসাপ্টা উত্তর আসবে, ‘না’ । কোনো জবাবদিহিতা আছে? উত্তর হবে, ‘না’ । ...'
              createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
              states={{
                read: 5,
                comment: 3,
                like: 3
              }}
              author={{
                name: 'লিমন লস্কর',
                image: ''
              }}
            />
          </VStack>


        </Box>


      </LayoutColumn>

    </HomeLayout>
  )
}
