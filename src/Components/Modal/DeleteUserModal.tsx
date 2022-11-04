import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteUserModal(props: any) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Confirmation Required
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>
                    Are You Sure to delete the User?
                </h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='warning' onClick={props.onHide}>Cancel</Button>
                <Button variant='danger' onClick={props.userdelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}   