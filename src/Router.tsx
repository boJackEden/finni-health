import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Error from './Routes/Error';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedWrapper } from './Components/ProtectedWrapper';
import Patient from './Routes/Patient';
import { getPatients as getPatientsLoader, getPatient as getPatientLoader } from './Services/PatientService';
import CreatePatient from './Routes/CreatePatient';
import { EditPatient } from './Routes/EditPatient';
import PatientTable from './Routes/PatientTable';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <ProtectedWrapper>
        <Dashboard /> 
      </ProtectedWrapper>
    ),
    errorElement: <Error />,
    loader: getPatientsLoader,
    shouldRevalidate: ({currentUrl}) => {
      console.log('Why isnt this loader working?', currentUrl.pathname !== '/dashboard');
      return currentUrl.pathname !== '/dashboard';
    },
    children: [
      {
        path: 'patient/:patientId',
        element: (<Patient/>),
        loader: async ({params})  => {
          return getPatientLoader(params.patientId as string);
        }
      },
      {
        path: 'create-patient',
        element: <CreatePatient />
      },
      {
        path: 'edit-patient/:patientId',
        element: <EditPatient />,
        loader: async ({params}) => {
          return getPatientLoader(params.patientId as string);
        }
      }
    ]
  }, 
  {
    path: '/patient-table',
    element: (
      <ProtectedWrapper>
        <PatientTable /> 
      </ProtectedWrapper>
    ),
    errorElement: <Error />,
    loader: getPatientsLoader,
    shouldRevalidate: ({currentUrl}) => {
      return currentUrl.pathname !== '/patient-table';
    },
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  }
]);

export default router;