import React from 'react';

import { Facility } from '../api/facilitiesAPI.types';

interface Props {
    facilities: Facility[];
}

export const FacilitiesListEventCreation: React.FC<Props> = ({ facilities }) => {
    console.log(facilities);
    return (
        <>
            {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                    {facility.name}
                </option>
            ))}
        </>
    );
};
