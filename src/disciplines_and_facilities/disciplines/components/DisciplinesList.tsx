import React from 'react';
import { Discipline } from '../api/disciplinesAPI.types';
import { SimpleGrid } from '@chakra-ui/react';
import { DisciplineInfo } from './DisciplineInfo';

interface Props {
    disciplines: Discipline[];
}
export const DisciplinesList: React.FC<Props> = ({ disciplines }) => {
    return (
        <SimpleGrid columns={1} spacing={5} marginTop={'2%'} width={'30%'} alignSelf={'center'}>
            {disciplines.map((discipline) => (
                <DisciplineInfo key={discipline.id} discipline={discipline} />
            ))}
        </SimpleGrid>
    );
};
