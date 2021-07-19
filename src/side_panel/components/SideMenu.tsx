import React, { useEffect } from 'react';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, Button, useDisclosure } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { FaIndent, FaDoorOpen } from 'react-icons/fa';
import { useAuth } from '../../authentication/context/AuthProvider';
import { UserGreeting } from './UserGreeting';
import { UserMenu } from './UserMenu';
import { Divider } from '@chakra-ui/react';

import { useProfile } from '../../profile/hooks/useProfile';
import { NoProfileAlert } from '../../profile/components/NoProfileAlert';

// eslint-disable-next-line
function SideMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
    const { logout } = useAuth();

    const onLogout = () => {
        logout();
    };
    const { profile, fetchProfile } = useProfile();

    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <>
            <Button alignSelf="flex-start" left="0px" variant="ghost" onClick={onOpen} size="md" justifyContent="center" _hover={{ fontSize: '2xl' }} _focus={{ border: 'none' }}>
                <FaIndent />
            </Button>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} variant="persistent" trapFocus={false} useInert={false}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader alignSelf={'center'} fontFamily="Montserrat" fontStyle="italic" size={'2xl'}>
                            Sport Buddies
                        </DrawerHeader>
                        <DrawerBody>
                            {profile == undefined && (
                                <>
                                    <NoProfileAlert />
                                    <Divider marginTop={'8px'} />
                                    <UserGreeting username={''} />
                                </>
                            )}

                            {profile !== undefined && (
                                <>
                                    <Divider marginTop={'8px'} />
                                    <UserGreeting username={profile.name} />
                                </>
                            )}

                            <Divider />
                            <UserMenu />
                        </DrawerBody>
                        <DrawerFooter>
                            <Button
                                variant="ghost"
                                onClick={onLogout}
                                size="md"
                                fontSize="lg"
                                marginLeft="2"
                                _hover={{
                                    fontSize: '2xl',
                                }}
                                aria-label={`Logout`}
                                _focus={{ border: 'none' }}
                            >
                                {<FaDoorOpen />}
                            </Button>
                            <ColorModeSwitcher justifySelf="flex-end" />
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}

export default SideMenu;
