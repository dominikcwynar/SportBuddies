import { useState } from 'react';
import { Discipline } from '../api/disciplinesAPI.types';
import { getDisciplines } from '../api/disciplinesAPI';

// eslint-disable-next-line
export function useDisciplines() {
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [isFetching, setFetching] = useState(false);

    async function fetchDisciplines(): Promise<boolean> {
        setFetching(true);
        const disciplines = await getDisciplines();
        setFetching(false);

        if (disciplines !== null && disciplines.length > 0) {
            setDisciplines(disciplines);
            return true;
        }
        return false;
    }
    return { disciplines, isFetching, fetchDisciplines };
}
