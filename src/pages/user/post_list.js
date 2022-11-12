import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import DraftedPosts from '../../Components/Account/DraftedPosts'
import PublishedPosts from '../../Components/Account/PublishedPosts'
import TrashedPosts from '../../Components/Account/TrashedPosts'
import AuthWrapperLoginFrom from '../../Components/Auth/AuthWrapperLoginFrom'
import SectionTitle from '../../Components/Common/SectionTitle'
import AuthWrapper from '../../Wrappers/AuthWrapper'
import AccountWrapper from './AccountWrapper'

export default function post_list() {

    const router = useRouter()
    const [user, setUser] = useState(null)

    return (

        <AuthWrapper loading={true} component={<AuthWrapperLoginFrom redirectUrl={router.asPath} />}>

            <AccountWrapper
                title='আমার ব্লগিং'
                getUser={setUser}
            >
                <Box my={10}>
                    {/* <SectionTitle title={'আমার ব্লগিং'} /> */}
                    <Tabs size={'sm'} variant='enclosed'>
                        <TabList>
                            <Tab>প্রকাশিত পোস্ট</Tab>
                            <Tab>খসড়া পোস্ট</Tab>
                            <Tab>ট্রাসড পোস্ট</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <PublishedPosts />
                            </TabPanel>
                            <TabPanel>
                                <DraftedPosts />
                            </TabPanel>
                            <TabPanel>
                                <TrashedPosts />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

            </AccountWrapper>
        </AuthWrapper>

    )
}
