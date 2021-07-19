import React, { useEffect, useState } from 'react';
import { EventCard } from './EventCard';
import { Event } from '../api/eventsAPI.types';
import { SimpleGrid, Center, Heading, Input, Box, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Flex, Checkbox, Accordion } from '@chakra-ui/react';
import { useDisciplines } from '../../disciplines_and_facilities/disciplines/hooks/useDisciplines';

interface Props {
    events: Event[];
    updateEvents: () => void;
}
export const filteredDisciplines: string[] = [];

export const EventsList: React.FC<Props> = ({ events, updateEvents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { disciplines, fetchDisciplines } = useDisciplines();

    function addDiscipline(name: string) {
        if (!filteredDisciplines?.includes(name)) {
            filteredDisciplines.push(name);
            updateEvents();
        } else {
            const index = filteredDisciplines.indexOf(name);
            filteredDisciplines.splice(index, 1);
        }
    }

    useEffect(() => {
        fetchDisciplines();
    }, [filteredDisciplines]);
    if (events.length == 0)
        return (
            <Center marginTop={20}>
                <Heading size={'md'}>Oops... Seems like there is nothing here...</Heading>
            </Center>
        );
    return (
        <Box alignItems={'center'} direction={'column'} width={'100%'}>
            <Center width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                <Input
                    width={'40%'}
                    type={'text'}
                    placeholder={'Search...'}
                    variant={'flushed'}
                    size={'md'}
                    margin={'1rem'}
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
                <Accordion allowMultiple isFocusable={'false'}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Filter
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <Flex direction={'column'} width={'100%'}>
                                {disciplines.map((discipline) => (
                                    <Checkbox key={discipline.name} onChange={() => addDiscipline(discipline.name)}>
                                        {discipline.name}
                                    </Checkbox>
                                ))}
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Center>

            <SimpleGrid columns={2} spacing={2}>
                {events
                    .filter((event) => {
                        if (searchTerm === '') {
                            return event;
                        } else if (event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return event;
                        }
                    })
                    .filter((event) => {
                        if (filteredDisciplines.includes(event.discipline.name)) {
                            console.log('here');
                            return event;
                        } else if (filteredDisciplines.length == 0) return event;
                    })
                    .map((event) => (
                        <EventCard updateEvents={updateEvents} key={event.id} event={event} />
                    ))}
            </SimpleGrid>
        </Box>
    );
};
