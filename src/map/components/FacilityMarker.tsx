import React from 'react';
import { FaMapMarker } from 'react-icons/all';
import { Button } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, Text } from '@chakra-ui/react';
import { Event } from '../../events/api/eventsAPI.types';
import { Facility } from '../../disciplines_and_facilities/facilities/api/facilitiesAPI.types';

export interface FacilityMarker {
    facility?: Facility;
    events?: Event[];
    lat?: number;
    lng?: number;
    color?: string;
}

export const FacilityMarker: React.FC<FacilityMarker> = ({ events, color, facility }) => {
    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Button variant={'transparent'} _focus={{ border: 'none' }}>
                    <FaMapMarker style={{ color: color ?? 'orange' }} />
                    {facility?.name}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Events taking place at the facility</PopoverHeader>
                <PopoverBody>
                    {events
                        ?.filter((e) => {
                            if (e.sport_facility?.name == facility?.name) return e;
                        })
                        .map((e, key) => (
                            <Text key={key}>{e.title}</Text>
                        ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
