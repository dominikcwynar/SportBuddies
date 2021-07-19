import React from 'react';
import { Box, Center, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import SideMenu from '../../side_panel/components/SideMenu';
import { EventCreationForm } from '../components/EventCreationForm';
import { fetchEvents } from '../hooks/fetchEvents';
import { EventsList } from '../components/EventsList';
import { useAuth } from '../../authentication/context/AuthProvider';

export const EventsView: React.FC = () => {
    const { events, isFetching, fetch } = fetchEvents();
    const { user_id } = useAuth();
    if (isFetching) return <>spinner</>;
    console.log('user id: ' + user_id);
    console.log();
    return (
        <Flex direction="row" width={'100%'}>
            <SideMenu />
            <Flex direction={'column'} alignItems={'center'} width={'100%'}>
                <Flex direction={'column'} width={'60%'} alignItems={'center'}>
                    <Heading size={'2xl'} marginTop={5} marginBottom={'1vh'} fontFamily="Montserrat" fontStyle="italic">
                        Browse events or create one!
                    </Heading>
                    <Center>
                        <EventCreationForm updateEvents={fetch} />
                    </Center>
                </Flex>

                <Box width={'60%'} marginTop={50}>
                    <Tabs variant={'solid-rounded'} colorScheme={'blue'} isFitted size={'lg'}>
                        <TabList>
                            <Tab _focus={{ border: 'none' }} _selected={{ background: 'blue.500', boxShadow: 'xl', color: 'white' }}>
                                Explore events
                            </Tab>
                            <Tab _focus={{ border: 'none' }} _selected={{ background: 'blue.500', boxShadow: 'xl', color: 'white' }}>
                                Joined events
                            </Tab>
                            <Tab _focus={{ border: 'none' }} _selected={{ background: 'blue.500', boxShadow: 'xl', color: 'white' }}>
                                Created events
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel width={'100%'}>
                                <EventsList
                                    updateEvents={fetch}
                                    events={events.filter(
                                        (event) =>
                                            (event.owner.id != user_id && !event.active_participants.find((participant) => participant.id == user_id)) ||
                                            (event.owner.id == user_id && !event.active_participants.find((participant) => participant.id == user_id))
                                    )}
                                />
                            </TabPanel>
                            <TabPanel width={'100%'}>
                                <EventsList
                                    updateEvents={fetch}
                                    events={events.filter((event) => event.owner.id != user_id && event.active_participants.find((participant) => participant.id == user_id))}
                                />
                            </TabPanel>
                            <TabPanel width={'100%'}>
                                <EventsList updateEvents={fetch} events={events.filter((event) => event.owner.id == user_id)} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </Flex>
    );
};
