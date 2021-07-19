import React from 'react';
import { Discipline } from '../api/disciplinesAPI.types';

interface Props {
    disciplines: Discipline[];
}

export const DisciplineListEventCreation: React.FC<Props> = ({ disciplines }) => {
    return (
        <>
            {disciplines.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>
                    {discipline.name}
                </option>
            ))}
        </>
    );
};
