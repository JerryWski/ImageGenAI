import { ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
}

const InputContainer = ({children}: FormProps) => {
  return (
    <p className='flex flex-col'>
        {children}
    </p>
  )
}

export default InputContainer
