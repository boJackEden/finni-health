import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { deletePatient } from "../Services/PatientService";

export type TPatient = {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string[];
  status: 'inquiry' | 'active' | 'onboarding' | 'churned';
  dob: string;
  customFields: {[key: string]: string};
};

export type TSavedPatient = TPatient & {id: string};

const Patient = () => {
  const patient = useLoaderData() as TSavedPatient;
  const navigate = useNavigate(); 
  const { patientId } = useParams() as { patientId: string };

  const handleEdit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate(`/dashboard/edit-patient/${patientId}`);
  };

  const handleDelete = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    deletePatient(patientId).then(() => {
      navigate(`/dashboard`);
    }).catch((e) => {
      console.error(e);
    });
  }

  return (
    <div id="contact">
      <div>
        <img
          src={`https://ui-avatars.com/api/?name=${patient.firstName}+${patient.lastName}&background=random`}
        />
      </div>
      <div>
        <h1>
            {patient.firstName} {patient.lastName}  
        </h1>
        <div>
          <h3>Address:</h3>
          {patient.address.map((line, ind) => (
            <p key={`${line}_${ind}`}>{line}</p>
          ))}
        </div>
        <div>
          <h3>Status:</h3>
          <p>{patient.status}</p>
        </div>
        <div>
          <h3>Date of Birth:</h3>
          <p>{patient.dob}</p>
        </div>
          {Object.keys(patient.customFields).length > 0 && (
              Object.keys(patient.customFields).map((key) => (
                <div key={patient.id}>
                  <h3>{key}:</h3>
                  <p>{patient.customFields[key]}</p>
                </div>
              ))
          )}
        <div>
          <Form onSubmit={handleEdit}>
            <button type="submit">Edit</button>
          </Form>
          <Form
            action="destroy"
            onSubmit={handleDelete}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Patient;