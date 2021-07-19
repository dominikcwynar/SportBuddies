import { useState } from 'react';
import { EventCreation, QuickEventCreation } from '../api/eventsAPI.types';
import { postJoinEvent, postEvent, postLeaveEvent, delEvent, quickPostEvent } from '../api/eventsAPI';

export enum ActionType {
    POST,
    UPDATE,
    DELETE,
    JOIN,
    LEAVE,
}

export function useCreateEvents() {
    const [isCalling, setIsCalling] = useState(false);
    const [error, setError] = useState(false);
    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-empty-function

    const call = createEvent;

    async function createEvent({ title, datetime, longitude, latitude, discipline_id, sport_facility_id, participants_number, description }: EventCreation): Promise<number | undefined> {
        setIsCalling(true);
        const payload = await postEvent(title, datetime, longitude, latitude, discipline_id, sport_facility_id, participants_number, description);
        setIsCalling(false);

        if (payload === null) {
            setError(true);
        } else {
            return payload.id;
        }
    }

    return { call, isCalling, error };
}
export function useQuickCreateEvents() {
    const [isCalling, setIsCalling] = useState(false);
    const [error, setError] = useState(false);
    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-empty-function

    const call = createEvent;

    async function createEvent({ title, datetime, longitude, latitude, discipline_id, participants_number, description }: QuickEventCreation): Promise<number | undefined> {
        setIsCalling(true);
        const payload = await quickPostEvent(title, datetime, longitude, latitude, discipline_id, participants_number, description);
        setIsCalling(false);

        if (payload === null) {
            setError(true);
        } else {
            return payload.id;
        }
    }

    return { call, isCalling, error };
}

export function useEvents(actionType: ActionType) {
    const [isCalling, setIsCalling] = useState(false);
    const [error, setError] = useState(false);
    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-empty-function

    let call = deleteEvent;
    switch (actionType) {
        case ActionType.DELETE:
            call = deleteEvent;
            break;
        case ActionType.JOIN:
            call = joinEvent;
            break;
        case ActionType.LEAVE:
            call = leaveEvent;
            break;
    }
    async function deleteEvent(eventId: number): Promise<void> {
        setIsCalling(true);
        const payload = await delEvent(eventId);
        setIsCalling(false);

        if (payload === null) {
            setError(true);
        }
    }

    async function joinEvent(eventId: number): Promise<void> {
        setIsCalling(true);
        const payload = await postJoinEvent(eventId);
        setIsCalling(false);

        if (payload === null) {
            setError(true);
        }
    }

    async function leaveEvent(eventId: number): Promise<void> {
        setIsCalling(true);
        const payload = await postLeaveEvent(eventId);
        setIsCalling(false);

        if (payload === null) {
            setError(true);
        }
    }

    return { call, isCalling, error };
}
