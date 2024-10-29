import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Error from './Routes/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { ProtectedWrapper } from './Components/ProtectedWrapper';
import Patient, { loader as patientLoader } from './Routes/Patient';
import { getPatients as getPatientsLoader } from './Services/PatientService';
import CreatePatient from './Routes/CreatePatient';



function App() {
  const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: (
        <ProtectedWrapper>
          <Dashboard/>
        </ProtectedWrapper>
      ),
      errorElement: <Error />,
      loader: getPatientsLoader,
      children: [
        {
          path: 'patient/:patientId',
          element: (<Patient/>),
          loader: async ({params})  => {
            return patientLoader(params.patientId as string);
          }
        },
        {
          path: 'create-patient',
          element: <CreatePatient />
        }
      ]
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

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
