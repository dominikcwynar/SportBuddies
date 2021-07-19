import React from 'react';
import { Box, Center, Heading, Stack, Text, Divider } from '@chakra-ui/react';
import { Event } from '../api/eventsAPI.types';
import { JoinEventButton } from './JoinEventButton';
import { useAuth } from '../../authentication/context/AuthProvider';
import { DeleteEventButton } from './DeleteEventButton';
import { LeaveEventButton } from './LeaveEventButton';
import { UpdateEventButton } from './UpdateEventButton';
interface Props {
    event: Event;
    updateEvents: () => void;
}
export const EventCard: React.FC<Props> = ({ event, updateEvents }) => {
    const { user_id } = useAuth();
    return (
        <Box width="100%" height="100%" padding={'2% 4% 2% 4%'} boxShadow={'md'} border={'2px'} borderColor={'blue.500'} borderRadius={20}>
            <Stack spacing={2} flexDirection="row" textAlign="left" justifyContent="space-between">
                <Center width={'100%'}>
                    <Heading fontFamily={'Montserrat'} fontStyle={'italic'} marginBottom={'2px'} size={'sm'}>
                        {event.title}
                    </Heading>
                </Center>
                <Stack flexDirection={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                    <JoinEventButton updateEvents={updateEvents} participants={event.active_participants} maxParticipants={event.participants_number} eventId={parseInt(event.id)} user_id={user_id} />
                    <LeaveEventButton updateEvents={updateEvents} participants={event.active_participants} eventId={parseInt(event.id)} user_id={user_id} />
                    <UpdateEventButton updateEvents={updateEvents} owner={event.owner} eventId={parseInt(event.id)} user_id={user_id} />
                    <DeleteEventButton updateEvents={updateEvents} owner={event.owner} eventId={parseInt(event.id)} user_id={user_id} />
                </Stack>
            </Stack>
            <Divider />
            <Text fontWeight="700" marginTop={'2%'}>
                Discipline
            </Text>
            <Text>{event.discipline.name}</Text>
            <Text fontWeight="700" marginTop={'2%'}>
                Description
            </Text>
            <Text>{event.description}</Text>
            {event.sport_facility && (
                <>
                    <Text fontWeight="700" marginTop={'2%'}>
                        Facility
                    </Text>
                    <Text>Name: {event.sport_facility.name}</Text>
                    <Text>Address: {event.sport_facility.address}</Text>
                </>
            )}
            <Text fontWeight="700" marginTop={'2%'}>
                Date
            </Text>
            <Text>{event.datetime}</Text>
            <Text fontWeight="700" marginTop={'2%'}>
                Participants
            </Text>
            <Text>
                {event.active_participants.length} / {event.participants_number}
            </Text>
        </Box>
    );
};
