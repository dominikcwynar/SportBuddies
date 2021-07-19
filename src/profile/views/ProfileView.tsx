import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import SideMenu from '../../side_panel/components/SideMenu';
import { ProfileCreationForm } from '../components/ProfileCreationForm';
import { useProfile } from '../hooks/useProfile';
import { Center, VStack } from '@chakra-ui/react';
import { NoProfileAlert } from '../components/NoProfileAlert';
import { ProfileCard } from '../components/ProfileCard';
export const ProfileView: React.FC = () => {
    const { profile, isFetching, fetchProfile } = useProfile();

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <Box>
            <SideMenu />
            <Center>
                <VStack width={'50%'} spacing={5}>
                    {profile == undefined && !isFetching && (
                        <Box marginTop={'50px'}>
                            <ProfileCreationForm name_prop={'Create'} />
                            <NoProfileAlert />
                        </Box>
                    )}
                    {profile !== undefined && (
                        <>
                            <Box width={'50%'}>
                                <ProfileCreationForm profile={profile} name_prop={'Edit'} />
                            </Box>

                            <ProfileCard profile={profile} />
                        </>
                    )}
                </VStack>
            </Center>
        </Box>
    );
};
