import React, { useState } from 'react'
import { auth } from '../Configs/firebase';
import { signOut } from 'firebase/auth';
import { Link, Outlet, useNavigate, useLoaderData, useLocation, Form } from 'react-router-dom';
import { TSavedPatient } from './Patient';
import styles from '../Styles/Routes.module.css';
import { matchSorter } from 'match-sorter';
type DashboardProps = {
};

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const patientsList = useLoaderData() as TSavedPatient[];
  const location = useLocation();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<TSavedPatient[]>(patientsList);

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
  };

  const handleSearch = (search: string) => {
    if (search === '') {
      setPatients(patientsList);
    } else {
      setPatients(
        matchSorter(patients, search, { keys: ['firstName', 'lastName'] })
      );
    }
  }

  return (
    <>
      <div id="sidebar">
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              onChange={e => handleSearch(e.target.value)}
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
          </Form>
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
        <button className={styles.logoutButton} onClick={logout}>Logout</button>
      </div>

      <div id="detail">
        {location.pathname === '/dashboard' ? <h1>Welcome to your patient dashboard</h1> : <Outlet />}
      </div>
    </>
  );
}

export default Dashboard;
