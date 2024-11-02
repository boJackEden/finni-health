import { PatientForm } from "../Components/PatientForm/PatientForm";
import { TPatient } from "./Patient";
import { createPatient } from "../Services/PatientService";
import { useNavigate } from 'react-router-dom';

export default function CreatePatient() {
  const navigate = useNavigate();  
  
  const submitPatientData = (patientData: TPatient) => {
    createPatient(patientData).then((id) => {
      navigate(`/dashboard/patient/${id}`);
    }).catch((e) => {
      console.error(e);
    });
  }

  return (
    <PatientForm submitPatientData={submitPatientData} />
  );
}