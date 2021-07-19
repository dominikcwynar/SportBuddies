import { Discipline } from '../../disciplines_and_facilities/disciplines/api/disciplinesAPI.types';
import { Facility } from '../../disciplines_and_facilities/facilities/api/facilitiesAPI.types';

export interface EventCreation {
    title: string;
    datetime: string;
    longitude: string;
    latitude: string;
    discipline_id: number;
    sport_facility_id: number;
    participants_number: string;
    description: string;
}
export interface QuickEventCreation {
    title: string;
    datetime: string;
    longitude: string;
    latitude: string;
    discipline_id: number;
    participants_number: string;
    description: string;
}

export interface Event {
    id: string;
    discipline: Discipline;
    owner: {
        id: number;
        username: string;
    };
    sport_facility?: Facility;
    active_participants: [
        {
            id: number;
            username: string;
        }
    ];
    title: string;
    datetime: string;
    longitude: string;
    latitude: string;
    participants_number: number;
    description: string;
}
