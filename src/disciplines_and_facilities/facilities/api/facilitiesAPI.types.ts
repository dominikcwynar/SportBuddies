import { Discipline } from '../../disciplines/api/disciplinesAPI.types';

export interface Facility {
    id: number;
    name: string;
    address: string;
    longitude: string;
    latitude: string;
    sport_disciplines: Discipline[];
}
