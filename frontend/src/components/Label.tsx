import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  className?: string;
  htmlFor: string;
}


const Label = ({ htmlFor, className, children }:LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        'text-stone-50 font-bold mb-1 text-left text-xs uppercase',
        className,
      )}
    >
      {children}
    </label>
  );
};

export default Label;
