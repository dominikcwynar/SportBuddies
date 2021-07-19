import React from 'react';
import { FaMapMarker } from 'react-icons/all';
import { Box } from '@chakra-ui/react';
export interface FacilityMarker {
    text: string;
    lat?: number;
    lng?: number;
    color?: string;
}

export const Marker: React.FC<FacilityMarker> = ({ text, color }) => {
    return (
        <Box flexDirection={'column'} width={'100px'} fontSize={'18px'}>
            <FaMapMarker style={{ color: color ?? 'orange' }} />
            {text}
        </Box>
    );
};
