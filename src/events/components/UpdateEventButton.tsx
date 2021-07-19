import React, { useEffect } from 'react';
import { Form, Formik, FormikValues } from 'formik';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useDisciplines } from '../../disciplines_and_facilities/disciplines/hooks/useDisciplines';
import { DisciplineListEventCreation } from '../../disciplines_and_facilities/disciplines/components/DisciplineListEventCreation';
import { FacilitiesListEventCreation } from '../../disciplines_and_facilities/facilities/components/FacilitiesListEventCreation';
import { useFacilities } from '../../disciplines_and_facilities/facilities/hooks/useFacilities';
import { useCreateEvents } from '../hooks/useEvents';
import { EventCreation } from '../api/eventsAPI.types';
import moment from 'moment';

interface Props {
    updateEvents: () => void;
    owner: {
        id: number;
        username: string;
    };
    eventId: number;
    user_id: number | null;
}

export const UpdateEventButton: React.FC<Props> = ({ updateEvents, owner, eventId, user_id }) => {
    const { disciplines, fetchDisciplines } = useDisciplines();
    const { facilities, fetchFacilities } = useFacilities();
    const { call, isCalling, error } = useCreateEvents();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onEventCreate = async (data: FormikValues) => {
        const time = moment(new Date(data.year, data.month - 1, data.day, data.hour + 2, data.minute))
            .toISOString()
            .replace(/.000/, '');

        const event: EventCreation = {
            title: data.title,
            datetime: time,
            longitude: data.longitude,
            latitude: data.latitude,
            discipline_id: data.discipline_id,
            sport_facility_id: data.sport_facility_id,
            participants_number: data.participants_number,
            description: data.description,
        };
        await call(event);
    };

    useEffect(() => {
        fetchDisciplines();
        fetchFacilities();
    }, []);
    if (owner.id == user_id)
        return (
            <VStack>
                <Button size="sm" colorScheme={'yellow'} onClick={onOpen} isLoading={isCalling}>
                    Edit
                </Button>

                <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px" fontFamily={'Montserrat'} fontStyle={'italic'}>
                            Edit an event
                        </DrawerHeader>
                        <DrawerBody>
                            <Formik
                                initialValues={{
                                    title: '',
                                    year: moment().year(),
                                    month: moment().month() + 1,
                                    day: moment().day() - 1,
                                    hour: moment().hour() + 1,
                                    minute: moment().minute(),
                                    longitude: '1',
                                    latitude: '1',
                                    discipline_id: '1',
                                    sport_facility_id: '1',
                                    participants_number: '2',
                                    description: 'default',
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    onEventCreate(values);
                                }}
                            >
                                {({ isSubmitting, values, setFieldValue, handleChange }) => (
                                    <Form>
                                        <FormLabel>Title</FormLabel>
                                        <Input marginBottom={5} type="text" name="title" placeholder={'Title'} value={values.title} onChange={handleChange} />
                                        <FormLabel>Date</FormLabel>
                                        <HStack justifyContent={'space-between'} marginBottom={5}>
                                            <NumberInput name="year" values={values.year} defaultValue={values.year} min={2021} max={2022} onChange={handleChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <NumberInput name="month" values={values.month} defaultValue={values.month} min={1} max={12} onChange={handleChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <NumberInput name="day" values={values.day} defaultValue={values.day} min={1} max={31} onChange={handleChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </HStack>
                                        <FormLabel>Time</FormLabel>
                                        <HStack width={'50%'} justifyContent={'space-between'} marginBottom={5}>
                                            <NumberInput name="hour" values={values.hour} defaultValue={values.hour} min={0} max={23} onChange={handleChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <NumberInput name="minute" values={values.minute} defaultValue={values.minute} min={0} max={59} onChange={handleChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </HStack>
                                        <FormLabel>Select discipline</FormLabel>
                                        <Select name="discipline_id" value={values.discipline_id} onChange={handleChange} marginBottom={5}>
                                            <DisciplineListEventCreation disciplines={disciplines} />
                                        </Select>
                                        <FormLabel>Select facility</FormLabel>
                                        <Select name="sport_facility_id" value={values.sport_facility_id} onChange={handleChange} marginBottom={5}>
                                            <FacilitiesListEventCreation facilities={facilities} />
                                        </Select>
                                        <FormLabel>Description</FormLabel>
                                        <Input type="text" name="description" placeholder={'Enter description...'} value={values.description} onChange={handleChange} marginBottom={5} />
                                        <FormLabel>How many participants do you need?</FormLabel>
                                        <Input marginBottom={5} type="text" name="participants_number" placeholder={'participants number'} value={values.participants_number} onChange={handleChange} />
                                        <Button type="submit" marginTop={10} width={'100%'} colorScheme={'blue'} disabled={isCalling}>
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
    else
        return (
            <Button size="sm" colorScheme={'yellow'} onClick={onOpen} isLoading={isCalling} visibility={'hidden'}>
                Edit
            </Button>
        );
};
