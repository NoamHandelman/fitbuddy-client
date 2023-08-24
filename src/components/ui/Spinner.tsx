import { FC } from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'h-4 w-4',
  medium: 'h-16 w-16',
  large: 'h-32 w-32',
};

const Spinner: FC<SpinnerProps> = ({ size = 'large' }) => {
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`${
        size === 'large' && 'h-screen'
      } flex justify-center items-center`}
    >
      <div
        className={`${sizeClass} animate-spin rounded-full border-t-4 border-b-4 border-teal-600`}
      ></div>
    </div>
  );
};

export default Spinner;
