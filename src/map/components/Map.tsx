import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { fetchEvents } from '../../events/hooks/fetchEvents';
import { FacilityMarker } from './FacilityMarker';
import { Marker } from './Marker';
import { useFacilities } from '../../disciplines_and_facilities/facilities/hooks/useFacilities';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Flex, useDisclosure, FormLabel, Input, HStack, Heading, Select, Center } from '@chakra-ui/react';
import SideMenu from '../../side_panel/components/SideMenu';
import { Form, Formik, FormikValues } from 'formik';
import { DisciplineListEventCreation } from '../../disciplines_and_facilities/disciplines/components/DisciplineListEventCreation';
import { ActionType, useEvents, useQuickCreateEvents } from '../../events/hooks/useEvents';
import { useDisciplines } from '../../disciplines_and_facilities/disciplines/hooks/useDisciplines';
import { QuickEventCreation } from '../../events/api/eventsAPI.types';

import moment from 'moment';
export type Location = {
    lat?: number;
    lng?: number;
};

export const Map: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { events, fetch } = fetchEvents();
    const { facilities, fetchFacilities } = useFacilities();
    const { disciplines, fetchDisciplines } = useDisciplines();
    const { call: join } = useEvents(ActionType.JOIN);
    const { call, isCalling, error } = useQuickCreateEvents();
    const [location, setLocation] = useState<Location>();
    const [clickLat, setClickLat] = useState(1);
    const [clickLng, setClickLng] = useState(1);

    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        fetch();
        fetchFacilities();
        fetchDisciplines();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) =>
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    const onEventCreate = async (data: FormikValues) => {
        const time = moment(new Date(data.year, data.month - 1, data.day, data.hour + 2, data.minute))
            .toISOString()
            .replace(/.000/, '');

        const event: QuickEventCreation = {
            title: data.title,
            datetime: time,
            longitude: data.longitude,
            latitude: data.latitude,
            discipline_id: data.discipline_id,
            participants_number: data.participants_number,
            description: data.description,
        };
        await call(event).then((id): void => {
            if (id) {
                join(id).then(fetch);
            }
        });
    };
    console.log(location);
    return (
        <Flex direction={'column'} width={'100vw'} height={'100vh'}>
            <Flex direction={'row'} width={'100%'}>
                <SideMenu />
                <Center width={'100%'}>
                    <Heading fontFamily="Montserrat" fontStyle="italic" alignSelf={'center'} size={'sm'}>
                        Here you can find available facilities and other events. Click on the map to add one!
                    </Heading>
                </Center>
            </Flex>

            {location?.lat && location.lng && key ? (
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    bootstrapURLKeys={{ key: key }}
                    defaultCenter={{
                        lat: location.lat,
                        lng: location.lng,
                    }}
                    defaultZoom={15}
                    onClick={(event) => {
                        console.log(event.event.target.toString());
                        if (event.event.target.type !== 'button' && event.event.target.toString() != '[object SVGSVGElement]' && event.event.target.toString() != '[object SVGPathElement]') {
                            setClickLat(event.lat);
                            setClickLng(event.lng);
                            onOpen();
                        }
                    }}
                >
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Quickly add a new event</ModalHeader>
                            <ModalBody>
                                <Formik
                                    initialValues={{
                                        title: '',
                                        year: moment().year(),
                                        month: moment().month() + 1,
                                        day: moment().day() - 1,
                                        hour: moment().hour() + 1,
                                        minute: moment().minute(),
                                        longitude: clickLng.toFixed(4),
                                        latitude: clickLat.toFixed(4),
                                        discipline_id: '1',
                                        participants_number: '2',
                                        description: 'default',
                                    }}
                                    onSubmit={(values) => {
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
                                            <FormLabel>Description</FormLabel>
                                            <Input type="text" name="description" placeholder={'Enter description...'} value={values.description} onChange={handleChange} marginBottom={5} />
                                            <FormLabel>How many participants do you need?</FormLabel>
                                            <Input
                                                marginBottom={5}
                                                type="text"
                                                name="participants_number"
                                                placeholder={'participants number'}
                                                value={values.participants_number}
                                                onChange={handleChange}
                                            />
                                            <Button type="submit" marginTop={10} width={'100%'} colorScheme={'blue'} disabled={isCalling}>
                                                Submit
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    {events.map((e, key) => {
                        if (e.sport_facility == null) return <Marker key={key} color={'orange'} lat={parseFloat(e.latitude)} lng={parseFloat(e.longitude)} text={e.title} />;
                    })}
                    {facilities.map((e, key) => (
                        <FacilityMarker key={key} color={'blue'} lat={parseFloat(e.latitude)} lng={parseFloat(e.longitude)} events={events} facility={e} />
                    ))}
                </GoogleMapReact>
            ) : (
                <>Loading...</>
            )}
        </Flex>
    );
};
