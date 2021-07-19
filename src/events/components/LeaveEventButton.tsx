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
    eventId: number;
    user_id: number | null;
}

export const LeaveEventButton: React.FC<Props> = ({ updateEvents, participants, eventId, user_id }) => {
    const { call, isCalling, error } = useEvents(ActionType.LEAVE);

    if (participants.find((participant) => participant.id === user_id))
        return (
            <Button size="sm" colorScheme={'blue'} variant="outline" onClick={() => call(eventId).then((): void => updateEvents())} isLoading={isCalling}>
                Leave
            </Button>
        );
    else
        return (
            <Button isDisabled size="sm" visibility="hidden" colorScheme={'blue'}>
                Leave
            </Button>
        );
};
