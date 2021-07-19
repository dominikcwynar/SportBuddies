import React, { useEffect } from 'react';
import { Flex, Heading, Spacer, Box, Center } from '@chakra-ui/react';
import SideMenu from '../../side_panel/components/SideMenu';
import { useDisciplines } from '../disciplines/hooks/useDisciplines';
import { FacilitiesList } from '../facilities/components/FacilitiesList';
import { useFacilities } from '../facilities/hooks/useFacilities';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { DisciplinesList } from '../disciplines/components/DisciplinesList';

export const ExploreView: React.FC = () => {
    const { facilities, fetchFacilities } = useFacilities();
    const { disciplines, fetchDisciplines } = useDisciplines();
    useEffect(() => {
        fetchFacilities();
        fetchDisciplines();
    }, []);

    return (
        <Flex direction={'row'} spacing={'10vw'} paddingRight={'20%'}>
            <SideMenu />
            <Spacer />
            <Flex direction={'column'} alignItems={'center'} width={'90%'}>
                <Heading size={'2xl'} marginTop={'5vh'} marginBottom={'1vh'} fontFamily="Montserrat" fontStyle="italic">
                    Explore!
                </Heading>
                <Heading size={'md'} marginBottom={'5vh'} fontFamily="Montserrat">
                    Here you can lookup available sport disciplines as well where to join other people at!
                </Heading>
                <Box width={'100%'}>
                    <Tabs variant={'solid-rounded'} colorScheme={'blue'} isFitted size={'lg'}>
                        <TabList>
                            <Tab _focus={{ border: 'none' }} _selected={{ background: 'blue.500', boxShadow: 'xl', color: 'white' }}>
                                Sport Facilities
                            </Tab>
                            <Tab _focus={{ border: 'none' }} _selected={{ background: 'blue.500', boxShadow: 'xl', color: 'white' }}>
                                Sport Disciplines
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel width={'100%'}>
                                <FacilitiesList facilities={facilities} />
                            </TabPanel>
                            <TabPanel>
                                <Center>
                                    {' '}
                                    <DisciplinesList disciplines={disciplines} />
                                </Center>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </Flex>
    );
};
