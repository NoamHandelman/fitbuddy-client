import toast from 'react-hot-toast';

const useNotification = () => {
  const successNotify = (message: string) => toast.success(message);

  const errorNotify = (message: string) => toast.error(message);

  return { successNotify, errorNotify };
};

export default useNotification;
