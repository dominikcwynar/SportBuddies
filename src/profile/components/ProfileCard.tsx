import { Profile } from '../api/profileAPI.types';
import { Box, Center, HStack, Tag, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
    profile: Profile;
}
export const ProfileCard: React.FC<Props> = ({ profile }) => {
    return (
        <Center marginTop={'200px'} width={'100%'}>
            <Box width="50%" height="60%" padding={'2% 4% 2% 4%'} boxShadow={'md'} border={'2px'} borderColor={'blue.500'} borderRadius={20}>
                <Text fontWeight="700" marginTop={'2%'}>
                    Name:
                </Text>
                <Text>{profile.name}</Text>
                <Text fontWeight="700" marginTop={'2%'}>
                    Age
                </Text>
                <Text>{profile.age}</Text>
                <Text fontWeight="700" marginTop={'2%'}>
                    Gender
                </Text>
                <Text>{profile.gender}</Text>
                <Text fontWeight="700" marginTop={'2%'}>
                    Description
                </Text>
                <Text>{profile.description}</Text>
                <Text fontWeight="700" marginTop={'2%'}>
                    Sport Disciplines:
                </Text>
                <HStack alignItems={'space-between'}>
                    {/*<SimpleGrid columns={2} spacing={4}>*/}
                    {profile.favourite_disciplines.map((discipline) => (
                        <Tag size={'md'} key={discipline.id} variant="solid" colorScheme="blue" textAlign={'center'}>
                            {discipline.name}
                        </Tag>
                    ))}
                    {/*</SimpleGrid>*/}
                </HStack>
            </Box>
        </Center>
    );
};
