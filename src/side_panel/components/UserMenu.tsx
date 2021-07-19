import React from 'react';
import { Button, VStack, Divider } from '@chakra-ui/react';
import { Routes } from '../../routing/routes';
import { FaGithub, FaCog, FaWrench } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { baseUrlBackend } from '../../constants/api';
export const UserMenu: React.FC = () => {
    const history = useHistory();
    return (
        <VStack width={'100%'} height="80%" marginTop={'20px'} justifyContent={'space-between'}>
            <VStack width={'100%'}>
                {' '}
                <Button
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => history.push(Routes.HOME)}
                >
                    Home
                </Button>
                <Button
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => history.push(Routes.EVENTS)}
                >
                    Events
                </Button>
                <Button
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => history.push(Routes.PROFILE)}
                >
                    Profile
                </Button>
                <Button
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => history.push(Routes.EXPLORE)}
                >
                    Explore
                </Button>
            </VStack>

            <VStack width={'100%'}>
                <Divider />
                <Button
                    leftIcon={<FaCog />}
                    variant="outline"
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => window.open(`${baseUrlBackend}`)}
                >
                    Swagger
                </Button>
                <Button
                    leftIcon={<FaWrench />}
                    variant="outline"
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => window.open(`${baseUrlBackend}/admin`)}
                >
                    Admin page
                </Button>
                <Button
                    leftIcon={<FaGithub />}
                    variant="outline"
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => window.open(`https://github.com/michalasznajder/sport-buddies-frontend`)}
                >
                    Frontend
                </Button>
                <Button
                    leftIcon={<FaGithub />}
                    variant="outline"
                    width={'100%'}
                    colorScheme={'blue'}
                    boxShadow={'md'}
                    _hover={{
                        boxShadow: 'lg',
                        transform: 'scale(1.02)',
                    }}
                    _focus={{ borderStyle: 'none' }}
                    onClick={() => window.open(`https://github.com/michalasznajder/sport-buddies-backend`)}
                >
                    Backend
                </Button>
                <Divider />
            </VStack>
        </VStack>
    );
};
