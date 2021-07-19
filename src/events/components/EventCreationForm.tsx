import React, { useEffect } from 'react';
import { Form, Formik, FormikValues } from 'formik';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, FormLabel, HStack, Input, Select, useDisclosure, VStack } from '@chakra-ui/react';
import { useDisciplines } from '../../disciplines_and_facilities/disciplines/hooks/useDisciplines';
import { DisciplineListEventCreation } from '../../disciplines_and_facilities/disciplines/components/DisciplineListEventCreation';
import { FacilitiesListEventCreation } from '../../disciplines_and_facilities/facilities/components/FacilitiesListEventCreation';
import { useFacilities } from '../../disciplines_and_facilities/facilities/hooks/useFacilities';
import { ActionType, useCreateEvents, useEvents } from '../hooks/useEvents';
import { EventCreation } from '../api/eventsAPI.types';
import moment from 'moment';

interface EventCreationFormProps {
    updateEvents: () => void;
}

export const EventCreationForm: React.FC<EventCreationFormProps> = ({ updateEvents }) => {
    const { disciplines, fetchDisciplines } = useDisciplines();
    const { facilities, fetchFacilities } = useFacilities();
    const { call, isCalling, error } = useCreateEvents();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { call: join } = useEvents(ActionType.JOIN);

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
        await call(event).then((id): void => {
            if (id) {
                join(id).then(() => updateEvents());
            }
        });
    };

    useEffect(() => {
        fetchDisciplines();
        fetchFacilities();
    }, []);

    return (
        <VStack width={'100%'}>
            <Flex flexDirection="row" width={'100%'} justifyContent={'space-between'}>
                <Button colorScheme="blue" onClick={onOpen} size={'lg'} alignSelf={'center'}>
                    Add new
                </Button>
            </Flex>
            <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px" fontFamily={'Montserrat'} fontStyle={'italic'}>
                        Create an event
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
                            onSubmit={(values) => {
                                console.log(values);
                                onEventCreate(values).then(() => {
                                    onClose();
                                });
                            }}
                        >
                            {({ values, handleChange }) => (
                                <Form>
                                    <FormLabel>Title</FormLabel>
                                    <Input marginBottom={5} type="text" name="title" placeholder={'Title'} value={values.title} onChange={handleChange} />
                                    <FormLabel>Date</FormLabel>
                                    <HStack justifyContent={'space-between'} marginBottom={5}>
                                        <Input type="number" name="year" placeholder={'Year'} value={values.year} onChange={handleChange} />
                                        <Input type="number" name="month" placeholder={'Month'} value={values.month} onChange={handleChange} />
                                        <Input type="number" name="day" placeholder={'Day'} value={values.day} onChange={handleChange} />
                                    </HStack>
                                    <FormLabel>Time</FormLabel>
                                    <HStack width={'50%'} justifyContent={'space-between'} marginBottom={5}>
                                        <Input type="number" name="hour" placeholder={'Hour'} value={values.hour} onChange={handleChange} />
                                        <Input type="number" name="minute" placeholder={'Minutes'} value={values.minute} onChange={handleChange} />
                                    </HStack>
                                    <FormLabel>Select discipline</FormLabel>
                                    <Select name="discipline_id" value={values.discipline_id} onChange={handleChange} marginBottom={5}>
                                        <DisciplineListEventCreation disciplines={disciplines} />
                                    </Select>
                                    <FormLabel>Select facility</FormLabel>
                                    <Select name="sport_facility_id" value={values.sport_facility_id} onChange={handleChange} marginBottom={5}>
                                        <FacilitiesListEventCreation
                                            facilities={facilities.filter((facility) => {
                                                if (facility.sport_disciplines.filter((d) => d.id === parseInt(values.discipline_id)).length) return facility;
                                            })}
                                        />
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
};
