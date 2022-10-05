import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function TabContainer({ childrens }) {
    return (
        <Tabs variant='enclosed' rounded={{base: 'sm', md:'sm'}} overflow='hidden' shadow='sm'>
            <TabList>
                {childrens.map((item, index) => <Tab _selected={{ bg: 'blackAlpha.50', rounded: 'none' }} p={{base: 2, md: 3}} key={index}>
                   <Title order={6}>{item.title}</Title>  
                </Tab>)}
            </TabList>
            <TabPanels bg='blackAlpha.50'>
                {childrens.map((item, index) => <TabPanel key={index}>
                    {item.component}
                </TabPanel>)}

            </TabPanels>
        </Tabs>
    )
}
