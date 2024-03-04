import React, { useState } from 'react'
import './employeeStyles.css'

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        createDate: new Date().getTime(),
        designation: '',
        gender: '',
        courses: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Handle checkbox input
            setFormData((prev) => {
                const courses = checked
                    ? [...prev.courses, value]
                    : prev.courses.filter((course) => course !== value);

                return { ...prev, courses };
            });
        } else {
            // Handle text, email, number, select, and radio inputs
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
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
        console.log(formData);
        let response = await fetch(`${process.env.REACT_APP_API_URL}/create-employee`, {
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
                    <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Create Employee</h2>
                    <div className='input'>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id='name' name='name' value={formData?.name || ''} onChange={handleChange} required />
                    </div>
                    <div className='input'>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id='email' name='email' value={formData?.email || ''} onChange={handleChange} required />
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
                            }} required />
                            <label htmlFor="male">Male: </label>
                            <input type="radio" id="male" name="gender" value="male" onChange={(e) => {
                                setFormData(prev => ({ ...prev, gender: 'male' }))
                            }} required />
                        </div>
                    </div>
                    <div className='input'>
                        <label htmlFor="course">Course: </label>
                        <div className='radio-wrapper'>
                            <label htmlFor="MCA">MCA</label>
                            <input type="checkbox" name='MCA' value='MCA' checked={formData.courses.includes('MCA')}
                                onChange={handleChange} />
                            <label htmlFor="BCA">BCA</label>
                            <input type="checkbox" value='BCA' name='BCA' checked={formData.courses.includes('BCA')}
                                onChange={handleChange} />
                            <label htmlFor="BSC">BSC</label>
                            <input type="checkbox" value='BSC' name='BSC' checked={formData.courses.includes('BSC')}
                                onChange={handleChange} />
                        </div>

                    </div>
                    <div className='input image'>
                        <label htmlFor="image">Image: </label>
                        <input type="file" id='image' name='image' accept=".jpg, .jpeg, .png" onChange={handleImage} required />
                    </div>
                    <input type="submit" value='Submit' className='submitForm' />
                </form>
            </div>

        </>
    )
}

export default CreateEmployee