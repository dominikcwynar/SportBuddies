import { useEffect, useState } from 'react';
import { Event } from '../api/eventsAPI.types';
import { getEvents } from '../api/eventsAPI';
import moment from 'moment';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function fetchEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isFetching, setFetching] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch(): Promise<void> {
        const events = await getEvents();
        setFetching(false);

        if (events !== null) {
            // console.log(moment());
            const filtered_events = events.filter((event) => {
                // console.log(event.datetime);
                return moment(event.datetime).isSameOrAfter(moment());
            });
            // console.log(filtered_events);
            setEvents(filtered_events);
        } else {
            setError(true);
        }
    }

    return { events, isFetching, error, fetch };
}

//"Mon, 25 Dec 1995 13:30:00 GMT"
