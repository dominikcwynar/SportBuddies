import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Facility } from '../api/facilitiesAPI.types';

import { FacilityInfo } from './FacilityInfo';

interface Props {
    facilities: Facility[];
}

export const FacilitiesList: React.FC<Props> = ({ facilities }) => {
    return (
        <SimpleGrid columns={2} spacing={10}>
            {facilities.map((facility) => (
                <FacilityInfo key={facility.id} facility={facility} />
            ))}
        </SimpleGrid>
    );
};
