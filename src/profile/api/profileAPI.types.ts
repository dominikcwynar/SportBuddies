import { Discipline } from '../../disciplines_and_facilities/disciplines/api/disciplinesAPI.types';

export interface ProfileCreation {
    name: string;
    age: string;
    gender: string;
    description: string;
    favourite_disciplines_id: number[];
}

export interface Profile {
    name: string;
    age: string;
    gender: string;
    description: string;
    favourite_disciplines: Discipline[];
}
