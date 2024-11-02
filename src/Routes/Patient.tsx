import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { deletePatient } from "../Services/PatientService";

export type TPatient = {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string[];
  status: 'inquiry' | 'active' | 'onboarding' | 'churned';
  dob: string;
  customFields?: string;
};

export type TSavedPatient = TPatient & {id: string};

const Patient = () => {
  const patient = useLoaderData() as TSavedPatient;  
  const navigate = useNavigate(); 
  const { patientId } = useParams() as { patientId: string };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate(`/dashboard/edit-patient/${patientId}`);
  };

  const handleDelete = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    deletePatient(patientId).then(() => {
      navigate(`/dashboard`);
    }).catch((e) => {
      console.error(e);
    })
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

        {/* {patient.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${patient.twitter}`}
            >
              {patient.twitter}
            </a>
          </p>
        )} */}

        {/* {patient.notes && <p>{patient.notes}</p>} */}

        <div>
          <Form onSubmit={handleSubmit}>
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