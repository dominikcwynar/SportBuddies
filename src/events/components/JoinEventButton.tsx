import React from 'react';
import { Button } from '@chakra-ui/react';
import { ActionType, useEvents } from '../hooks/useEvents';

interface Props {
    updateEvents: () => void;
    participants: [
        {
            id: number;
            username: string;
        }
    ];
    maxParticipants: number;
    eventId: number;
    user_id: number | null;
}

export const JoinEventButton: React.FC<Props> = ({ updateEvents, participants, maxParticipants, eventId, user_id }) => {
    const { call, isCalling, error } = useEvents(ActionType.JOIN);

    if (participants.length < maxParticipants && !participants.find((participant) => participant.id === user_id))
        return (
            <Button size="sm" colorScheme={'blue'} onClick={() => call(eventId).then(() => updateEvents())} isLoading={isCalling}>
                Join
            </Button>
        );
    else
        return (
            <Button isDisabled size="sm" visibility="hidden" colorScheme={'blue'}>
                Join
            </Button>
        );
};
