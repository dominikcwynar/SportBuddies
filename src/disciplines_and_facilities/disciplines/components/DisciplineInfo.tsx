import React from 'react';
import { Box } from '@chakra-ui/react';
import { Discipline } from '../api/disciplinesAPI.types';
interface Props {
    discipline: Discipline;
}

export const DisciplineInfo: React.FC<Props> = ({ discipline }) => {
    return (
        <Box
            width={'100%'}
            height="50px"
            textAlign={'center'}
            lineHeight={'50px'}
            borderRadius={'20px'}
            border={'2px'}
            borderColor={'blue.500'}
            fontFamily={'Montserrat'}
            fontStyle="italic"
            fontSize={'1.5rem'}
            boxShadow={'md'}
            _hover={{ boxShadow: 'lg' }}
        >
            {discipline.name}
        </Box>
    );
};
