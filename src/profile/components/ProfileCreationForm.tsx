import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikValues } from 'formik';
import { useDisclosure, VStack, Flex, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Heading, Input, FormLabel, Select } from '@chakra-ui/react';
import { useDisciplines } from '../../disciplines_and_facilities/disciplines/hooks/useDisciplines';
import { DisciplinesFormList } from '../../disciplines_and_facilities/disciplines/components/DisciplinesFormList';
import { useProfile } from '../hooks/useProfile';
import { Profile } from '../api/profileAPI.types';

export interface ProfileCreationFormData {
    name: string;
    age: string;
    gender: string;
    description: string;
    favourite_disciplines_id: number[];
}

interface Props {
    profile?: Profile;
    name_prop: string;
}
export const ProfileCreationForm: React.FC<Props> = ({ profile = undefined, name_prop }) => {
    const { disciplines, fetchDisciplines } = useDisciplines();
    const { createProfile, updateProfile } = useProfile();
    const [error, setError] = useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onProfileCreate = async (data: FormikValues) => {
        console.log('create');
        console.log(data.favouriteDisciplines);
        const result = await createProfile(data.name, data.age, data.gender, data.description, data.favouriteDisciplines);
        if (!result) {
            setError('Something went wrong while creating the profile.');
        } else {
            setError(null);
        }
    };

    const onProfileUpdate = async (data: FormikValues) => {
        console.log('edit');
        console.log(data.favouriteDisciplines);
        const result = await updateProfile(data.name, data.age, data.gender, data.description, data.favouriteDisciplines);

        if (!result) {
            setError('Something went wrong while creating the profile.');
        } else {
            setError(null);
        }
    };
    // const handleSubmit = (values: FormikValues): void => {};

    useEffect(() => {
        fetchDisciplines();
    }, []);

    return (
        <VStack width={'100%'}>
            <Flex flexDirection="row" width={'100%'} justifyContent={'space-between'}>
                <Heading> Your Profile</Heading>
                <Button colorScheme="blue" onClick={onOpen}>
                    {name_prop} Profile
                </Button>
            </Flex>

            <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px" fontFamily={'Montserrat'} fontStyle={'italic'}>
                        {name_prop} Your Profile
                    </DrawerHeader>
                    <DrawerBody>
                        <Formik
                            initialValues={{
                                name: '',
                                age: '',
                                gender: 'Male',
                                description: '',
                                favouriteDisciplines: [],
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (profile == undefined) {
                                    onProfileCreate(values);
                                } else {
                                    onProfileUpdate(values);
                                }
                                location.reload();
                            }}
                        >
                            {({ isSubmitting, values, setFieldValue, handleChange }) => (
                                <Form>
                                    <FormLabel>Name</FormLabel>
                                    <Input marginBottom={5} type="text" name="name" placeholder={'Name'} value={values.name} onChange={handleChange} />
                                    <FormLabel>Age</FormLabel>
                                    <Input marginBottom={5} type="number" name="age" placeholder={'Age'} value={values.age} onChange={handleChange} />
                                    <FormLabel>Gender</FormLabel>
                                    <Select name="gender" value={values.gender} onChange={handleChange} marginBottom={5}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                    <FormLabel>Description</FormLabel>
                                    <Input type="text" name="description" placeholder={'Your description...'} value={values.description} onChange={handleChange} marginBottom={5} />
                                    <FormLabel marginBottom={5}>Choose your favourite sport discplines:</FormLabel>
                                    <DisciplinesFormList disciplines={disciplines} setFieldValue={setFieldValue} />
                                    <Button type="submit" marginTop={10} width={'100%'} colorScheme={'blue'}>
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </VStack>
    );
};
