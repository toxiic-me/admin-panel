import React, { useEffect, useState } from 'react'
import '../create-employee/employeeStyles.css'

const UpdateEmployee = ({ updateData }) => {
    const { name, email, phone, gender, designation, course, id, } = updateData;
    const [formData, setFormData] = useState({ name, email, phone, gender, designation, course, id });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            if (type === 'checkbox') {
                // Handle checkbox input
                const updatedCourses = checked
                    ? [...prev.course, value]
                    : prev.course.filter((course) => course !== value);

                return { ...prev, course: updatedCourses };
            } else {
                // Handle text, email, number, select, and radio inputs
                return { ...prev, [name]: value };
            }
        });
    };
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const dataURL = reader.result;
                setFormData(prev => ({ ...prev, image: dataURL }));
            };

            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_API_URL}/update-employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${JSON.parse(localStorage.getItem('adminData')).token}`
            },
            body: JSON.stringify(formData)
        })

        let result = await response.json()
        if (result?.message) {
            alert(result.message);
        } else {
            alert(result.error)
        }
    }

    return (
        <>
            <div className='form-wrapper' onSubmit={handleSubmit}>
                <form className='employee-form'>
                    <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Update Employee</h2>
                    <div className='input'>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id='name' name='name' value={formData?.name || ''} onChange={handleChange} required />
                    </div>
                    <div className='input'>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id='email' name='email' value={formData.email} required />
                    </div>
                    <div className='input'>
                        <label htmlFor="phone">Mobile No: </label>
                        <input type="number" id='phone' name='phone' value={formData?.phone || ''} onChange={handleChange} required />
                    </div>
                    <div className='input'>
                        <label htmlFor="designation">Designation: </label>
                        <select
                            name="designation"
                            id="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                        >
                            <option value=""></option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className='input'>
                        <label htmlFor="gender">Gender: </label>
                        <div className='radio-wrapper'>
                            <label htmlFor="female">Female: </label>
                            <input type="radio" id="female" name="gender" value="female" onChange={(e) => {
                                setFormData(prev => ({ ...prev, gender: 'female' }))
                            }} required checked={formData?.gender === 'female' ? true : false} />
                            <label htmlFor="male">Male: </label>
                            <input type="radio" id="male" name="gender" value="male" onChange={(e) => {
                                setFormData(prev => ({ ...prev, gender: 'male' }))
                            }} required checked={formData?.gender === 'male' ? true : false} />
                        </div>
                    </div>
                    <div className='input'>
                        <label htmlFor="course">Course: </label>
                        <div className='radio-wrapper'>
                            <label htmlFor="MCA">MCA</label>
                            <input type="checkbox" name='MCA' value='MCA' checked={formData.course.includes('MCA')}
                                onChange={handleChange} />
                            <label htmlFor="BCA">BCA</label>
                            <input type="checkbox" value='BCA' name='BCA' checked={formData.course.includes('BCA')}
                                onChange={handleChange} />
                            <label htmlFor="BSC">BSC</label>
                            <input type="checkbox" value='BSC' name='BSC' checked={formData.course.includes('BSC')}
                                onChange={handleChange} />
                        </div>

                    </div>
                    <div className='input image'>
                        <label htmlFor="image">Image: </label>
                        <input type="file" id='image' name='image' accept=".jpg, .jpeg, .png" onChange={handleImage} required />
                    </div>
                    <input type="submit" value='Update' className='submitForm' />
                </form>
            </div>

        </>
    )
}

export default UpdateEmployee


