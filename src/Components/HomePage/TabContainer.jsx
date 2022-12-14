import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function TabContainer({ childrens }) {
    return (
        <Tabs variant='unstyled' rounded={{base: 'sm', md:'lg'}} overflow='hidden' shadow='sm'>
          
            <TabList border={'none'}>
                {childrens.map((item, index) => <Tab role="group" _selected={{ rounded: 'none', fontWeight: 'semibold' }} px={0} mr={5} key={index}>
                   <Text as={'h6'} _groupActive={{}} fontSize={{base:'14px', lg: '17px'}}>{item.title}</Text>  
                </Tab>)}
            </TabList> 

            <TabPanels p={0} w='full'>
                {childrens.map((item, index) => <TabPanel px={0} py={1} key={index}>
                    {item.component}
                </TabPanel>)} 
            </TabPanels>

        </Tabs>
    )
}
