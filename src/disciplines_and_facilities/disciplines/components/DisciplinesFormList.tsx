import React from 'react';
import { Discipline } from '../api/disciplinesAPI.types';
import { Checkbox, SimpleGrid } from '@chakra-ui/react';
interface Props {
    disciplines: Discipline[];
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
}
export const favDisciplines: number[] = [];
export const DisciplinesFormList: React.FC<Props> = ({ disciplines, setFieldValue }) => {
    function addDiscipline(id: number) {
        if (!favDisciplines?.includes(id)) {
            favDisciplines.push(id);
        } else {
            const index = favDisciplines.indexOf(id);
            favDisciplines.splice(index, 1);
        }
        console.log(favDisciplines);
        setFieldValue('favouriteDisciplines', favDisciplines);
    }
    return (
        <SimpleGrid columns={2} spacing={4}>
            {disciplines.map((discipline) => (
                <Checkbox key={discipline.id} onChange={() => addDiscipline(discipline.id)}>
                    {discipline.name}
                </Checkbox>
            ))}
        </SimpleGrid>
    );
};
