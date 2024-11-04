import React from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { TPatient } from './Patient';
import { PatientForm } from '../Components/PatientForm/PatientForm';
import { updatePatient } from '../Services/PatientService';

export const EditPatient: React.FC = () => {
  const patient = useLoaderData() as TPatient;  
  const navigate = useNavigate();
  const { patientId } = useParams() as { patientId: string };
  
  const submitPatientData = (patientData: TPatient) => {
    updatePatient(patientId, patientData).then(() => {
      navigate(`/dashboard/patient/${patientId}`);
    }).catch((e) => {
      console.error(e);
    })
  };

  return (
    <PatientForm submitPatientData={submitPatientData} patientEditValues={patient}/>
  );
}