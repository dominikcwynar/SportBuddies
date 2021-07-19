import axios from 'axios';
import { baseUrl } from '../../constants/api';
import { Event } from './eventsAPI.types';

export const postEvent = (
    title: string,
    datetime: string,
    longitude: string,
    latitude: string,
    discipline_id: number,
    sport_facility_id: number,
    participants_number: string,
    description: string
): Promise<{ id: number } | null> =>
    axios
        .post(`${baseUrl}/sport-event/`, {
            title,
            datetime,
            longitude,
            latitude,
            discipline_id,
            sport_facility_id,
            participants_number,
            description,
        })
        .then((response) => response.data)
        .catch(() => null);

export const quickPostEvent = (
    title: string,
    datetime: string,
    longitude: string,
    latitude: string,
    discipline_id: number,
    participants_number: string,
    description: string
): Promise<{ id: number } | null> =>
    axios
        .post(`${baseUrl}/sport-event/`, {
            title,
            datetime,
            longitude,
            latitude,
            discipline_id,

            participants_number,
            description,
        })
        .then((response) => response.data)
        .catch(() => null);

export const postJoinEvent = (eventId: number): Promise<boolean | null> =>
    axios
        .post(`${baseUrl}/sport-event/join/${eventId}`)
        .then((response) => true)
        .catch(() => null);

export const postLeaveEvent = (eventId: number): Promise<boolean | null> =>
    axios
        .post(`${baseUrl}/sport-event/leave/${eventId}`)
        .then((response) => true)
        .catch(() => null);

export const delEvent = (eventId: number): Promise<boolean | null> =>
    axios
        .delete(`${baseUrl}/sport-event/${eventId}`)
        .then((response) => true)
        .catch(() => null);

export function getEvents(): Promise<Event[] | null> {
    return axios
        .get<Event[]>(`${baseUrl}/sport-event/`)
        .then((response) => response.data)
        .catch(() => null);
}
