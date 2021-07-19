import react, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Event } from '../api/eventsAPI.types';

interface Props {
    events: Event[];
    updateEvents: () => void;
}

export const EventFilter: React.FC<Props> = ({ events, updateEvents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <input
            type={'text'}
            placeholder={'Search...'}
            onChange={(event) => {
                setSearchTerm(event.target.value);
            }}
        ></input>
    );
};
