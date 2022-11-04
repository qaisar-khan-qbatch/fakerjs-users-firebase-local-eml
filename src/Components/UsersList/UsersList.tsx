import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { faker } from '@faker-js/faker';
import Table from 'react-bootstrap/Table';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './UsersList.css'

import DeleteUserModal from '../Modal/DeleteUserModal'
import ViewUserModal from '../Modal/ViewUserModal'
import PaginationComp from '../Pagination/Pagination';
import { IEmployee } from '../Employee.type'

import {
  getEmulatorData,
  addEmulatorData,
  documentsCount,
  deleteEmulatorDoc
} from '../lib/firebase'

const UsersList = () => {

  let list: any[] = []
  const navigate = useNavigate()
  const genLatLng = () => {
    const pin = {
      address: [faker.address.city(), '-', faker.address.county()],
      lat: Number((Math.random() * 360 - 180).toFixed(8)),
      lng: Number((Math.random() * 180 - 90).toFixed(8)),
    }
    return pin;
  }
  const createRandomUser = () => {
    return {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      company: faker.company.name(),
      address: [faker.address.city(), '-', faker.address.county()],
      locaiton: genLatLng(),
      catchPhrase: faker.random.words(),
      website: faker.internet.domainName()
    };
  }

  const [dataFlag, setDataFlag] = useState<boolean>(false)
  const [elems, setElems] = useState<any>([])
  const [deleteModal, setDeleteModal] = useState<any>('')
  const [viewUserModal, setViewUserModal] = useState<any>(false)
  const [userDeleted, setUserDelete] = useState<any>('')
  const [paginate, setPaginate] = useState<number>(0)
  const [dataCount, setDataCount] = useState<number>(0)
  const [addedUser, setAddedUser] = useState<IEmployee[]>([])
  const [docSnap, setDocSnap]=useState<any>([])
  
  useEffect(() => {
    if (dataFlag) {
      setTimeout(() => {
        (async function () {
          setElems(await getEmulatorData(paginate,docSnap))
          setDataCount(await documentsCount())
        })()
        setDataFlag(false)
      }, 1000)
    }
  }, [dataFlag])

  useEffect(() => {
    if(elems){
      setDocSnap(elems.snap)
    }
  }, [elems])
  
  useEffect(() => {
    if (addedUser) {
      (async function () {
        addEmulatorData(addedUser)
      })().then(() =>
        setDataFlag(true)
      )
    }
  }, [addedUser])

  useEffect(() => {
    if (userDeleted.length) {
      (async function () {
        deleteEmulatorDoc(userDeleted)
        addEmulatorData(addedUser)
      })().then(() =>
        setDataFlag(true)
      )
      setUserDelete(false)
    }
  }, [userDeleted])

  const handleUserAdd = () => {
    Array.from({ length: 10 }).forEach(() => {
      list.push(createRandomUser());
    });
    setAddedUser(list)
  }
  const handleUserEdit = (e: any) => {
    navigate('/edit-user/', { state: { id: e.id } });
  }
  const handleDeleteModal = (e: any) => {
    setDeleteModal(e.id)
  }
  const handleUserDelete = (id: any) => {
    setUserDelete(id)
    setDeleteModal(false)
  }
  const handleUSerViewModal = (value: any) => {

    setViewUserModal(value.id)
  }
  const handlePagination = (pageNum = 0) => {
    if (pageNum) {
      setPaginate(pageNum)
      setDataFlag(true)
    }
  }

  return (
    <>
      {
        deleteModal &&
        <>
          <DeleteUserModal
            show={deleteModal.length}
            onHide={() => setDeleteModal(false)}
            userdelete={() => {handleUserDelete(deleteModal)}}
          />
        </>
      }
      {
        viewUserModal && <ViewUserModal
          show={viewUserModal.length}
          onHide={() => setViewUserModal(false)}
          user_to_view={viewUserModal}
        />
      }
      <Button variant="info" onClick={handleUserAdd} className='add-user'>
        Add 10 Users
      </Button>

      <Table striped bordered hover className='users-detail'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            elems?.data?.map((item: IEmployee, index: React.Key) => {
              return <tr key={index}>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.company}</td>
                <td>
                  <ButtonGroup className="action-buttons"  >
                    <Button variant="success" onClick={() => handleUserEdit(item)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteModal(item)}>Delete</Button>
                    <Button variant="warning" onClick={() => handleUSerViewModal(item)} >View</Button>
                  </ButtonGroup>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>

      <PaginationComp total={dataCount} paginate={(e: any) => handlePagination(e)} />
    </>
  )
}

export default UsersList