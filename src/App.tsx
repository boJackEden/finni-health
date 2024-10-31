import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import router from './Router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

// TODO:
// - Add search in patient list
// - Add Finni logos
// - Add ability to add more fields to patient data
// - update patient view to include more fields
