package com.klef.HospitalManagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class PatientService {
	 @Autowired
	    private PatientRepository patientRepository;

	    public List<Patient> getAllPatients() {
	        return patientRepository.findAll();
	    }

	    public Patient createPatient(Patient patient) {
	        return patientRepository.save(patient);
	    }

	    public Patient updatePatient(Long id, Patient patientDetails) {
	        Patient patient = patientRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Patient not found with id " + id));

	        patient.setEmail(patientDetails.getEmail());
	        patient.setFirstName(patientDetails.getFirstName());
	        patient.setLastName(patientDetails.getLastName());
	        patient.setDob(patientDetails.getDob());
	        patient.setMobile(patientDetails.getMobile());
	        patient.setAddress(patientDetails.getAddress());
	        patient.setPassword(patientDetails.getPassword());

	        return patientRepository.save(patient);
	    }

	    public void deletePatient(Long id) {
	        patientRepository.deleteById(id);
	    }
}
