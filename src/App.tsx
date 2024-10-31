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
