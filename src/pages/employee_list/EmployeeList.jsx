import React, { useEffect, useState } from 'react'
import './employeeListSTyles.css'

const EmployeeList = ({ setPage, setUpdateData }) => {
    const [employees, setEmployees] = useState([]);
    const [refreshList, setRefreshList] = useState(0)

    const refreshPage = () => {
        setRefreshList(refreshList => refreshList + 1)
    }

    const getEmployeesData = async () => {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/get-employees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${JSON.parse(localStorage.getItem('adminData')).token}`
            }
        })
        let result = await response.json()
        if (!result.error) {
            setEmployees([...result])
        } else {
            alert(result.error)
        }
    }

    useEffect(() => {
        getEmployeesData()
    }, [refreshList])
    return (
        <>
            <div className='employeeListheading'>
                <h2>Employee List</h2>
                <button onClick={() => setPage('CreateEmployee')}>Create Employee</button>
            </div>
            <div className='listHeading'>
                <h2 className='uniqueId'>Id</h2>
                <h2 className='image'>Image</h2>
                <h2 className='name'>Name</h2>
                <h2 className='email'>Email</h2>
                <h2 className='mobile'>Mobile No.</h2>
                <h2 className='designation' >Designation</h2>
                <h2 className='gender'>Gender</h2>
                <h2 className='course'>Course</h2>
                <h2 className='createDate'>Create date</h2>
                <h2 className='actions'>Actions</h2>
            </div>
            <div className='data-list'>
                {
                    employees.length > 0 ?
                        employees.map(({ name, email, phone, image, gender, designation, course, createDate, id }) => {
                            return (
                                <ListItem
                                    key={id}
                                    name={name}
                                    email={email}
                                    image={image}
                                    phone={phone}
                                    gender={gender}
                                    designation={designation}
                                    course={course}
                                    createDate={createDate}
                                    id={id}
                                    refreshList={refreshPage}
                                    setUpdateData={setUpdateData}
                                    setPage={setPage}
                                />
                            )
                        }) : null

                }
            </div>

        </>
    )
}

const ListItem = ({ name, email, phone, image, gender, designation, course, createDate, id, refreshList, setUpdateData, setPage }) => {
    const [formatedDate, setformatedDate] = useState(createDate)
    const handleEdit = (id) => {
        setUpdateData({ name, email, phone, image, gender, designation, course, id, setPage })
        setPage('UpdateEmployee')
    }

    const handleDelete = async (id) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/delete-employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('adminData')).token}`
                },
                body: JSON.stringify({ id })
            })
            let result = await response.json()
            if (result?.message) {
                alert(result.message)
                refreshList()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formatTime = (timeInMilliseconds) => {
        const date = new Date(timeInMilliseconds);

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        setformatedDate(date.toLocaleString('en-US', options));
    };
    useEffect(() => {
        formatTime(createDate)

    }, [])


    return (
        <>
            <div className='listHeading'>
                <p className='uniqueId'>{id}</p>
                <div className='image'>
                    <img src={image} />
                </div>
                <p className='name'>{name}</p>
                <p className='email'>{email}</p>
                <p className='mobile'>{phone}</p>
                <p className='designation' >{designation}</p>
                <p className='gender'>{gender}</p>
                <p className='course'>{course?.map(course => ` ${course} `)}</p>
                <p className='createDate'>{formatedDate}</p>
                <div className='actions'>
                    <button className='update' onClick={() => handleEdit(id)}>Edit</button>
                    <button className='delete' onClick={() => handleDelete(id)}>Delete</button>
                </div>
            </div>
        </>
    )
}


export default EmployeeList