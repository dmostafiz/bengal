import { Avatar, Box, Center, Divider, Flex, Heading, Image, Show, Spacer, Text, VisuallyHidden, VStack } from '@chakra-ui/react'
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
import SectionTitle from '../Components/Common/SectionTitle'
import TopPostsCarousel from '../Components/HomePage/TopPostsCarousel'
import UserPanel from '../Components/Common/UserPanel'
import TopCommenters from '../Components/HomePage/TopCommenters'

const Home = () => {


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

        <VisuallyHidden>
          <Heading as='h1'>সামান্তরিক বাংলা ব্লগ</Heading>
          <Text>সামান্তরিক বাংলা ব্লগ! বাংলাদেশ এর বৃহৎ একটি বাংলা ব্লগিং ওয়েব পোর্টাল. এটি মূলত বাংলাদেশ এবং ভারত-কলকাতা এবং অন্যান্য অঞ্চলের বাঙ্গালী অধিবাসীদের জন্য জনপ্রিয় একটি মাধ্যম। তাছাড়া বাংলা ভাষায় সাহিত্য চর্চা, গল্প, কবিতা, উপন্যাস, ধারাবাহিক গল্প লেখার জন্য সামান্তরিক ব্লগ একটি সময়পযোগি মাধ্যম যেখানে প্রতিনিয়তই হাজারও লেখক-পাঠকের সমাগম হয়। সামান্তরিক বাংলা ব্লগ প্রতিষ্ঠিত হয়েছে ১০ই নভেম্বর ২০২২ এ মোস্তাফিজুর রহমান এর হাত ধরে</Text>
        </VisuallyHidden>


        <Show below='md'>
          {/* <UserPanel /> */}
        </Show>

        <Box mb={8} w='full' overflow={'hidden'}>

          <TabContainer childrens={[
            {
              title: 'জনপ্রিয় পোস্ট',
              component: <TopPostsCarousel />
            },

            // {
            //   title: 'বাছাইকৃত পোস্ট',
            //   component: <SelectedPostsCarousel />
            // },

            // {
            //   title: 'ধারাবাহিক পোস্ট',
            //   component: <StepPostsCarousel />
            // },

            {
              title: 'টপ ব্লগার',
              component: <TopBloggers />
            },

          ]} />


        </Box>



        <TopCommenters />

        <Box mb={8}>

          <SectionTitle bg='blackAlpha.50' showBorder={false} py={2} px={3} mb={4} title='সাম্প্রতিক পোস্ট (ক্রমানুসারে)' />

          <LatestBlogPost />

        </Box>


      </LayoutColumn>

    </HomeLayout>
  )
}

Home.getInitialProps = async (ctx) => {

  return {}
}

export default Home