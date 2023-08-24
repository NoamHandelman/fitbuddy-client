import { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface NewInputProps extends HTMLAttributes<HTMLInputElement> {
  type: string;
  name?: string;
  value: string;
}

const Input: FC<NewInputProps> = ({
  className,
  type,
  name,
  value,
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={cn(
        'w-72 border-b border-gray-500 focus:border-blue-500 outline-none bg-transparent autofill',
        className
      )}
      {...props}
    />
  );
};

export default Input;
