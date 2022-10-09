import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import LoginComponent from './LoginComponent'
import RegistrationComponent from './RegistrationComponent'

export default function AuthComponent() {
    return (

        <Tabs isFitted variant='unstyled' overflow='hidden'>

            <TabList border={'none'} bg='blackAlpha.200'>
                <Tab _selected={{ bg: 'blackAlpha.50', rounded: 'none', fontWeight: 'normal' }} px={{ base: 2, md: 3 }}>
                    <Text as={'h6'} fontSize={{ base: '14px', md: '16px' }}>লগইন করুন</Text>
                </Tab>

                <Tab role="group"  _selected={{ bg: 'blackAlpha.50', rounded: 'none', fontWeight: 'normal' }} px={{ base: 2, md: 3 }}>
                    <Text as={'h6'} fontSize={{ base: '14px', md: '16px' }}>একাউন্ট তৈরী</Text>
                </Tab>
            </TabList>

            <TabPanels bg='blackAlpha.50' w='full'>

                <TabPanel pt={5} px={2}>
                    <LoginComponent />
                </TabPanel>

                <TabPanel pt={5}  px={2}>
                    <RegistrationComponent />
                </TabPanel>

            </TabPanels>

        </Tabs>
    )
}
