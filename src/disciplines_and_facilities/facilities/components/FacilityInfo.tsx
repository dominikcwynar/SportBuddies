import React from 'react';
import { Box, Heading, Stack, Divider, Text, HStack, Tag } from '@chakra-ui/react';

import { Facility } from '../api/facilitiesAPI.types';
interface Props {
    facility: Facility;
}

export const FacilityInfo: React.FC<Props> = ({ facility }) => {
    {
        facility.sport_disciplines.map((discipline) => console.log(discipline.name));
    }
    return (
        <Box
            overflow="visible"
            width="100%"
            height="100%"
            display="block"
            border={'2px'}
            borderColor={'blue.500'}
            borderRadius={20}
            padding={'2% 4% 2% 4%'}
            boxShadow={'md'}
            _hover={{ boxShadow: 'xl', background: 'gray.50' }}
        >
            <Stack spacing={2} flexDirection="row" textAlign="left" justifyContent="space-between">
                <Heading fontFamily={'Montserrat'} fontStyle={'italic'} marginBottom={'2px'}>
                    {facility.name}
                </Heading>
                <Text display="block">id: {facility.id} </Text>
            </Stack>
            <Divider borderColor="blackAlpha.500" />
            <Stack spacing={4} flexDirection="column">
                <Stack justifyContent="flex-start" alignItems="flex-end" flexDirection="row">
                    <Text fontWeight="700" marginRight={'2%'}>
                        Address:
                    </Text>
                    <Text>{facility.address}</Text>
                </Stack>
                <Stack justifyContent="flex-start" alignItems="flex-end" flexDirection="row">
                    <Text fontWeight="700" marginRight={'2%'}>
                        Lat-Long:
                    </Text>
                    <Text>
                        ( {facility.latitude.slice(0, 7)} , {facility.longitude.slice(0, 7)} )
                    </Text>
                </Stack>
                <Stack justifyContent="flex-start" alignItems="flex-end" flexDirection="row">
                    <Text fontWeight="700" marginRight={'2%'}>
                        Sport Disciplines:
                    </Text>
                    <HStack alignItems={'space-between'}>
                        {facility.sport_disciplines.map((discipline) => (
                            <Tag size={'md'} key={discipline.id} variant="solid" colorScheme="blue">
                                {discipline.name}
                            </Tag>
                        ))}
                    </HStack>
                </Stack>
            </Stack>
        </Box>
    );
};
