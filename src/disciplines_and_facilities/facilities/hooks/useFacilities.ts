import { useState } from 'react';
import { Facility } from '../api/facilitiesAPI.types';
import { getFacilities } from '../api/facilitiesAPI';

// eslint-disable-next-line
export function useFacilities() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [isFetching, setFetching] = useState(false);

    async function fetchFacilities(): Promise<boolean> {
        setFetching(true);
        const facilities = await getFacilities();
        setFetching(false);

        if (facilities !== null && facilities.length > 0) {
            setFacilities(facilities);
            return true;
        }
        return false;
    }
    return { facilities, isFetching, fetchFacilities };
}
