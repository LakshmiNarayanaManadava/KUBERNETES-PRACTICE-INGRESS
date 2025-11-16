import React, { useState } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;
    

function HospitalManagement() {
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState(initialFormData());
    const [editingIndex, setEditingIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log('Backend URL:', import.meta.env.VITE_API_URL);


    function initialFormData() {
        return {
            id: '',          // Keep ID for edit/update
            email: '',
            firstName: '',
            lastName: '',
            dob: '',
            mobile: '',
            address: '',
            password: '',
        };
    }

    // ✅ Retrieve Patients from Backend
    function retrivePatients() {
        setLoading(true);
        axios.get(`${baseUrl}/api/patients/get`)
            .then(res => setPatients(res.data))
            .catch(err => console.error('Error fetching patients:', err))
            .finally(() => setLoading(false));
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (editingIndex !== null) {
            updatePatient();
        } else {
            createPatient();
        }
    }

    function createPatient() {
        axios.post(`${baseUrl}/api/patients/post`, formData)
            .then(() => {
                retrivePatients();
                resetForm();
            })
            .catch(err => console.error('Error creating patient:', err));
    }

    function updatePatient() {
        axios.put(`${baseUrl}/api/patients/${formData.id}`, formData)
            .then(() => {
                retrivePatients();
                resetForm();
                setEditingIndex(null);
            })
            .catch(err => console.error('Error updating patient:', err));
    }

    function deletePatient(id) {
        axios.delete(`${baseUrl}/api/patients/${id}`)
            .then(() => retrivePatients())
            .catch(err => console.error('Error deleting patient:', err));
    }

    function editPatient(patient, index) {
        setFormData(patient);
        setEditingIndex(index);
    }

    function resetForm() {
        setFormData(initialFormData());
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Hospital Management System</h2>

            {/* Form */}
            <form onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required /><br /><br />
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required /><br /><br />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required /><br /><br />
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required /><br /><br />
                <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleInputChange} required /><br /><br />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required /><br /><br />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required /><br /><br />

                <button type="submit">{editingIndex !== null ? 'Update Patient' : 'Add Patient'}</button>
                <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>Clear</button>
            </form>

            <hr />

            {/* Button to Get Patients */}
            <button onClick={retrivePatients} style={{ marginBottom: '20px' }}>
                Get Patients
            </button>

            {loading ? (
                <p>Loading patients...</p>
            ) : (
                <>
                    <h3>Patient Records</h3>
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>DOB</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {patients.length === 0 ? (
                                <tr><td colSpan="7" align="center">No patient records</td></tr>
                            ) : (
                                patients.map((patient, index) => (
                                    <tr key={patient.id}>
                                        <td>{patient.email}</td>
                                        <td>{patient.firstName}</td>
                                        <td>{patient.lastName}</td>
                                        <td>{patient.dob}</td>
                                        <td>{patient.mobile}</td>
                                        <td>{patient.address}</td>
                                        <td>
                                            <button onClick={() => editPatient(patient, index)}>Edit</button>
                                            <button onClick={() => deletePatient(patient.id)} style={{ marginLeft: '5px' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default HospitalManagement;
