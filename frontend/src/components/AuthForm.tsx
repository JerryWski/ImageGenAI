import { useState } from 'react';
import Form from './Form';
import InputContainer from './InputContainer';
import Label from './Label';
import Input from './Input';

const AuthForm = () => {
  const [authMode, setAuthMode] = useState('login');

  function handleSwitchAuthMode() {
    setAuthMode((prevAuthMode) => {
      return prevAuthMode === 'login' ? 'signup' : 'login';
    });
  }

  return (
    <Form className='max-w-[35rem] mx-auto'>
      <InputContainer>
        <Label htmlFor='email'>Emial</Label>
        <Input type='email' id='email' />
      </InputContainer>
      <InputContainer>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' />
      </InputContainer>
      <p className='flex flex-col gap-3 mt-4'>
        <button className='bg-sky-400 text-black py-2 rounded-lg hover:bg-sky-500 disabled:cursor-not-allowe disabled:bg-stone-400 disabled:text-stone-600'>
          {authMode === 'login' ? 'Log in' : 'Sign up'};
        </button>
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
