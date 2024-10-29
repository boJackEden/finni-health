import { get } from "http";
import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getPatient } from "../Services/PatientService";

export type TPatient = {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string[];
  status: 'inquiry' | 'active' | 'onboarding' | 'churned';
  dob: string;
};

export const loader = async (patientId: string) => {
  return getPatient(patientId).then((patientData) => {
    return patientData;
  }).catch((e) => {
    console.error(e);
  })
}

const Patient = () => {
  const patient = useLoaderData() as TPatient;  
  return (
    <div id="contact">
      <div>
        <img
          src={"https://robohash.org/you.png?size=200x200"}
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
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              event.preventDefault();
              // if (
              //   !confirm(
              //     "Please confirm you want to delete this record."
              //   )
              // ) {
              //   event.preventDefault();
              // }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// function Favorite({ patient }: {patient: TPatient}) {
//   const favorite = patient.favorite;
//   return (
//     <Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={
//           favorite
//             ? "Remove from favorites"
//             : "Add to favorites"
//         }
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// }

export default Patient;