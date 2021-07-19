import axios from 'axios';
import { baseUrl } from '../../../constants/api';
import { Facility } from './facilitiesAPI.types';

export function getFacilities(): Promise<Facility[]> {
    return axios
        .get(`${baseUrl}/sport-facility/`)
        .then((response) => response.data)
        .catch(() => null);
}
