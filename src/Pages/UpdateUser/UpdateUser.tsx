import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './UpdateUser.css'

import { editEmulatorDoc, updateEmulatorDoc } from '../../Components/lib/firebase'

function BasicExample() {

    const [userEdited, setUserEdited] = useState<any>([])
    const [updatedUser, setUpdatedUser] = useState<any>({})
    const [submittedForm, setSubmittedForm] = useState<any>(false)
    const location = useLocation()

    const id = location?.state?.id

    useEffect(() => {
        (async function () {
            setUserEdited(await editEmulatorDoc(id))
        })()
    }, [])

    useEffect(() => {

        if (submittedForm && updatedUser) {
            (async function () {
                await updateEmulatorDoc(id, updatedUser)
            })()
        } 
    }, [submittedForm])

    const handleFormSubmit = (e: any) => {
        e.preventDefault()
        setSubmittedForm(true)
    }
    const handleNmaeChange = (e: any) => {
        let name = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            name,
        }))
    }
    const handleUserNmaeChange = (e: any) => {
        let userName = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            userName
        }))
    }
    const handleEmailChange = (e: any) => {
        let email = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            email

        }))
    }
    const handlePhoneChange = (e: any) => {
        let phone = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            phone
        }))
    }
    const handleAddressChange = (e: any) => {
        let address = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            address
        }))
    }
    const handleCompanyChange = (e: any) => {
        let company = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            company
        }))
    }
    const handleCatchPharaseChange = (e: any) => {
        let catchPharase = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            catchPharase
        }))
    }
    const handleLocationChange = (e: any) => {
        let location = e.target.value
        setUpdatedUser((state: any) => ({
            ...state,
            location
        }))
    }
    return (
        <>
            <article className='article-header'>
                <header>
                    <h1> Firebase Local Emulator ft FakerJs </h1>
                </header>
            </article>
            <Form className='update-form' method='post' onSubmit={(e) => handleFormSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" defaultValue={userEdited?.name} onChange={(e) => handleNmaeChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" name="userName" defaultValue={userEdited?.username} onChange={(e) => handleUserNmaeChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" defaultValue={userEdited?.email} onChange={(e) => handleEmailChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" defaultValue={userEdited?.phone} onChange={(e) => handlePhoneChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" defaultValue={userEdited?.address} onChange={(e) => handleAddressChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" name="Website" defaultValue={userEdited?.website} onChange={(e) => handleLocationChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" name="company" defaultValue={userEdited?.company} onChange={(e) => handleCompanyChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Company's Catch-Pharase</Form.Label>
                    <Form.Control type="text" name="catchPharase" defaultValue={userEdited?.catchPhrase} onChange={(e) => handleCatchPharaseChange(e)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default BasicExample;