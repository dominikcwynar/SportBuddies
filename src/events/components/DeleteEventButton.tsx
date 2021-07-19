import React from 'react';
import { Button } from '@chakra-ui/react';
import { ActionType, useEvents } from '../hooks/useEvents';

interface Props {
    updateEvents: () => void;
    owner: {
        id: number;
        username: string;
    };
    eventId: number;
    user_id: number | null;
}

export const DeleteEventButton: React.FC<Props> = ({ updateEvents, owner, eventId, user_id }) => {
    const { call, isCalling, error } = useEvents(ActionType.DELETE);

    if (owner.id == user_id)
        return (
            <Button
                size="sm"
                colorScheme={'red'}
                onClick={() =>
                    call(eventId).then(() => {
                        updateEvents();
                    })
                }
                isLoading={isCalling}
                variant={'outline'}
            >
                Delete
            </Button>
        );
    else
        return (
            <Button isDisabled size="sm" visibility="hidden" variant={'outline'} colorScheme={'red'}>
                Delete
            </Button>
        );
};
