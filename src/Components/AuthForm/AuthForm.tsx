import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth, googleProvider} from '../../Configs/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import styles from './AuthForm.module.css';

type AuthFormProps = {

};

const AuthForm: React.FC<AuthFormProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const loginErrorMessage = 'There was an error logging you in. Do you have an account?';
  const navigate = useNavigate();

  const clearErrors = () => {
    setLoginError('');
  }

  const signIn = async () => {
    clearErrors();
    try {
      signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate('/dashboard');
      }).catch((e) => {
        setLoginError(loginErrorMessage);
        console.error(e);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const signInWithGoogle = async () => {
    clearErrors();
    try {
      signInWithPopup(auth, googleProvider).then(() => {
        navigate('/dashboard');
      }).catch((e) => {
        setLoginError(loginErrorMessage);
        console.error(e);
      });
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.authContainer}>
        <h1>Login</h1>
        <input 
          placeholder='Email...' 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          placeholder='Password...' 
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.authButton} onClick={signIn}>Sign in</button>
        <button className={styles.authButton} onClick={signInWithGoogle}>Sign in with Google</button>
        {loginError.length > 1 && <p className={styles.errorMessage}>{loginError}</p>}
        <div>
          <p>Create an account...</p>
          <button onClick={() => {
            navigate('/signup'); 
            clearErrors();
          }}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;