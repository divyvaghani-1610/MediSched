package com.medibook.config;

import com.medibook.model.Doctor;
import com.medibook.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DoctorRepository doctorRepository;

    @Override
    public void run(String... args) {
        if (doctorRepository.count() == 0) {
            Doctor[] doctors = {
                createDoctor("Dr. Sarah Johnson", "Cardiologist"),
                createDoctor("Dr. Michael Chen", "Neurologist"),
                createDoctor("Dr. Emily Williams", "Pediatrician"),
                createDoctor("Dr. David Brown", "Orthopedic Surgeon"),
                createDoctor("Dr. Lisa Anderson", "Dermatologist"),
                createDoctor("Dr. James Wilson", "Family Medicine"),
                createDoctor("Dr. Maria Garcia", "Gynecologist"),
                createDoctor("Dr. Robert Taylor", "Psychiatrist"),
                createDoctor("Dr. Jennifer Lee", "Ophthalmologist"),
                createDoctor("Dr. Thomas Moore", "ENT Specialist")
            };

            for (Doctor doctor : doctors) {
                doctorRepository.save(doctor);
            }
        }
    }

    private Doctor createDoctor(String name, String specialization) {
        Doctor doctor = new Doctor();
        doctor.setName(name);
        doctor.setSpecialization(specialization);
        return doctor;
    }
}