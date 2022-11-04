import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

import { GeoLoc } from '../Employee.type'
import { editEmulatorDoc } from '../lib/firebase'
import GMap from '../GoogleMap/GoogleMap';

export default function ViewUserModal(props: any) {


    const [pinLocation, setPinLocatin] = useState<GeoLoc>()
    const [viewUSer, SetviewUser] = useState<any>(false);

    useEffect(() => {
        (async function () {
            SetviewUser(await editEmulatorDoc(props.user_to_view))
        })()

    }, [])

    useEffect(() => {
        if (viewUSer) {
            setPinLocatin(
                {
                    address: viewUSer.locaiton.address,
                    lat: Number(viewUSer.locaiton.lat),
                    lng: Number(viewUSer.locaiton.lng),
                }
            )
        }
    }, [viewUSer]) 

    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg" centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Name : {viewUSer.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <ListGroup>
                            <ListGroup.Item>UserName : {viewUSer?.username}</ListGroup.Item>
                            <ListGroup.Item> Email : {viewUSer?.email}</ListGroup.Item>
                            <ListGroup.Item> Phone : {viewUSer?.phone}</ListGroup.Item>
                            <ListGroup.Item> Address : {viewUSer?.address}</ListGroup.Item>
                            <ListGroup.Item> Website : {viewUSer?.website}</ListGroup.Item>
                            <ListGroup.Item> Company : {viewUSer?.company}</ListGroup.Item>
                            <ListGroup.Item> Catch-Pharse : {viewUSer?.catchPhrase}</ListGroup.Item>
                            <ListGroup.Item> Location :
                                {viewUSer?.locaiton?.address + ' Lat ' + viewUSer?.locaiton?.lat + ' Lng ' + viewUSer?.locaiton?.lng}
                            </ListGroup.Item>
                        </ListGroup>
                        {pinLocation && pinLocation?.lat && pinLocation?.lng  && <GMap location={pinLocation} zoomLevel={5} />}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
