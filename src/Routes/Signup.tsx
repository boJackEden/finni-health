import { useState } from 'react';
import {auth, googleProvider} from '../Configs/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Routes.module.css';

type SignupProps = {

};

const Signup: React.FC<SignupProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const signupErrorMessage = 'There was an error signing you up.';
  const navigate = useNavigate();

  const clearErrors = () => {
    setSignupError('');
  }

  const createAccountWithEmail = async () => {
    clearErrors();
    try {
      createUserWithEmailAndPassword(auth, email, password).then(() => {
        navigate('/dashboard');
      }).catch((e) => {
        setSignupError(signupErrorMessage);
        console.error(e);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const createAccountWithGoogle = async () => {
    clearErrors();
    try {
      signInWithPopup(auth, googleProvider).then(() => {
        navigate('/dashboard');
      }).catch((e) => {
        setSignupError(signupErrorMessage);
        console.error(e);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.authContainer}>
      <h1>Signup</h1>
      <input 
        placeholder='Email...' 
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        placeholder='Password...' 
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createAccountWithEmail}>Sign up</button>
      <button onClick={createAccountWithGoogle}>Sign up with Google</button>
      {signupError.length > 1 && <p className={styles.errorMessage}>{signupError}</p>}
      <div>
        <p>Already have an account?</p>
        <button onClick={() => {
          navigate('/login')
          clearErrors();
        }}>Login</button>
      </div>
      </div>
    </div>
  );
}

export default Signup;