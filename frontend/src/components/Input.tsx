import { twMerge } from 'tailwind-merge';

interface InputProps {
  className?: string;
  isTextArea?: boolean;
  type: string;
  id:string;
  name: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
}


const Input = ({ isTextArea, className, ...props }:InputProps) => {
  const Component = isTextArea ? 'textarea' : 'input';
  return (
    <Component
      className={twMerge('bg-stone-600 p-2 rounded-lg', className)}
      {...props}
    />
  );
};

export default Input;
