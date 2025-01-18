import { ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
}

const Form = ({ children }: FormProps) => {
  return (
    <form action="" className="bg-stone-700 p-4 rounded-lg flex flex-col gap-3">
        {children}
    </form>
  )
}

export default Form
