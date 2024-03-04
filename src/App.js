import React, { useState } from 'react'
import Login from './pages/login/Login.js'
import Home from './pages/home/Home.jsx'
import CreateEmployee from './pages/create-employee/CreateEmployee.jsx'
import EmployeeList from './pages/employee_list/EmployeeList.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import UpdateEmployee from './pages/update-employee/UpdateEmployee.jsx'

const App = () => {
  const [page, setPage] = useState('Login');
  const [updateData, setUpdateData] = useState({})

  const openPage = (page) => {
    setPage(page)
  }

  const setUpdateFn = ({ name, email, phone, image, gender, designation, course, id, }) => {
    setUpdateData({ name, email, phone, image, gender, designation, course, id, })
  }

  return (
    <>
      {page === 'Login' ? <Login setPage={openPage} /> : <Navbar setPage={openPage} />}
      {page === 'Home' ? <Home setPage={openPage} /> : null}
      {page === 'EmployeeList' ? <EmployeeList setPage={openPage} setUpdateData={setUpdateFn} /> : null}
      {page === 'CreateEmployee' ? <CreateEmployee setPage={openPage} /> : null}
      {page === 'UpdateEmployee' ? <UpdateEmployee setPage={openPage} updateData={updateData} /> : null}
    </>
  )
}

export default App