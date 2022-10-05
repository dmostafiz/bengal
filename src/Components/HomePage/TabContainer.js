import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function TabContainer({ childrens }) {
    return (
        <Tabs variant='enclosed' rounded={{base: 'sm', md:'sm'}} overflow='hidden' shadow='sm'>
            <TabList border={'none'}>
                {childrens.map((item, index) => <Tab _selected={{ bg: 'gray.100', rounded: 'none' }} p={{base: 2, md: 3}} key={index}>
                   <Text as={'h6'} fontSize={{base:'12px', md: '17px'}} fontWeight='semibold'>{item.title}</Text>  
                </Tab>)}
            </TabList>
            <TabPanels bg='gray.100'>
                {childrens.map((item, index) => <TabPanel key={index}>
                    {item.component}
                </TabPanel>)}
            </TabPanels>
        </Tabs>
    )
}
