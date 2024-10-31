import React, { useEffect } from 'react'
import { auth } from '../Configs/firebase';
import { signOut } from 'firebase/auth';
import { Link, Outlet, useNavigate, useLoaderData, useLocation, useRevalidator } from 'react-router-dom';
import { TSavedPatient } from './Patient';

type DashboardProps = {
};

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const patients = useLoaderData() as TSavedPatient[];
  const location = useLocation();
  // const revalidator = useRevalidator();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      signOut(auth).then(() => {
        navigate('/login');
      }).catch((e) => {
        console.error(e);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   revalidator.revalidate();
  // }, []);

  return (
    <>
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <button type="submit" onClick={() => navigate('/dashboard/create-patient')}>New</button>
        </div>
        <nav>
          <ul>
            {
              patients.map((patient) => (
                <li key={patient.id}>
                  <Link to={`patient/${patient.id}`}>{`${patient.firstName} ${patient.lastName}`}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
        <button onClick={logout}>Logout</button>
      </div>
      <div id="detail">
        {location.pathname === '/dashboard' ? <h1>Welcome to your patient dashboard</h1> : <Outlet />}
      </div>
    </>
  );
}

export default Dashboard;