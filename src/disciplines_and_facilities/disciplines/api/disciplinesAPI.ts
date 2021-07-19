import axios from 'axios';
import { Discipline } from './disciplinesAPI.types';
import { baseUrl } from '../../../constants/api';

export function getDisciplines(): Promise<Discipline[]> {
    return axios
        .get(`${baseUrl}/sport-discipline/`)
        .then((response) => response.data)
        .catch(() => null);
}
