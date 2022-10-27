import { Avatar, Box, Center, Divider, Flex, Image, Show, Spacer, Text, VStack } from '@chakra-ui/react'
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
import { useEffect } from 'react'
import req from '../Helpers/axiosHelper'
import BlogPanel from '../Components/Common/BlogPanel'
import LatestBlogPost from '../Components/HomePage/LatestBlogPost'

export default function Home() {


  // useEffect(() => {

  //   (
  //     async () => {

  //       const  {data} = await req.get('/auth')
  //       console.log('Requested User: ', data)
  //     }
  //   )()

  // }, [])

  return (
    <HomeLayout>

      <LayoutColumn

        leftSide={<MainLeftSidebar />}

        rightSide={<MainRightSidebar />}

        pageTopSection={<></>}

      >

        {/* <ImageBanner src='/banner.png' /> */}

        {/* <Box mb={8}></Box> */}


        <Show below='md'>
          <BlogPanel />
        </Show>

        <Box mb={8} w='full' overflow={'hidden'}>
          
          <TabContainer childrens={[
            {
              title: 'বাছাইকৃত পোস্ট',
              component: <SelectedPostsCarousel />
            },

            {
              title: 'ধারাবাহিক প্রকাশনী',
              component: <StepPostsCarousel />
            },

            {
              title: 'সেরা ব্লগার',
              component: <TopBloggers />
            },

          ]} />


        </Box>


        <Box mb={8}>

          <Box py={3} borderBottom='0px' borderColor={'blackAlpha.200'} px={4} mb={6} bg={'blackAlpha.50'} fontWeight='bold' rounded='sm'>
            <Title order={4}><Text color={'blackAlpha.800'}>সাম্প্রতিক পোস্ট (ক্রমানুসারে)</Text></Title>
          </Box>

          <LatestBlogPost />

          <VStack gap={5} mt={8}>


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
              image='https://s3.amazonaws.com/somewherein/pictures/sherzatapon/sherzatapon-1665287090-be03f99_xlarge.jpg'
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
