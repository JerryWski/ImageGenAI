import { useState } from 'react';
import Form from './Form';
import InputContainer from './InputContainer';

const AuthForm = () => {
  const [authMode, setAuthMode] = useState('login');

  function handleSwitchAuthMode() {
    setAuthMode((prevAuthMode) => {
      return prevAuthMode === 'login' ? 'signup' : 'login';
    });
  }

  return (
    <Form>
      <InputContainer>
        <label htmlFor='email'>Emial</label>
        <input type='email' id='email' />
      </InputContainer>
      <InputContainer>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' />
      </InputContainer>
      <p>
        <button>Submit</button>
        <button type='button' onClick={handleSwitchAuthMode}>
          {authMode === 'login'
            ? 'Create a new User'
            : 'I already have an account, log in instead'}
        </button>
      </p>
    </Form>
  );
};

export default AuthForm;
