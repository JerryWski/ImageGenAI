import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormProps {
  children: ReactNode;
  className?: string;
}

//twMerge allow to merge classes and use own classes in the component(Form classname="bg-red-500")
const Form = ({ children, className }: FormProps) => {
  return (
    <form action="" className={twMerge("bg-stone-700 p-4 rounded-lg flex flex-col gap-3", className)}>
        {children}
    </form>
  )
}

export default Form
