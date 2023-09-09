'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import EditSection from '@/components/my-account-page/EditSection';
import useUserMutation from '@/hooks/user/useUserMutation';
import { editUserSchema } from '@/schemas/user.schema';
import { ZodError } from 'zod';
import useNotification from '@/hooks/useNotification';
import Spinner from '../ui/Spinner';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState(initialState);
  const [isInputVisible, setIsInputVisible] = useState({
    username: false,
    email: false,
    password: false,
  });

  const { editUser, isLoadingEdit, deleteUser, isLoadingDeletion } =
    useUserMutation();

  const { errorNotify } = useNotification();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setUserDetails(initialState);
    setIsInputVisible({ username: false, email: false, password: false });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { username, email, password } = userDetails;

      if (!username && !email && !password) {
        return errorNotify('You did not edit none of the fields!');
      }

      const updatedValues = {
        username: username || undefined,
        email: email || undefined,
        password: password || undefined,
      };

      editUserSchema.parse(updatedValues);

      editUser(updatedValues);
      resetForm();
    } catch (error) {
      if (error instanceof ZodError) {
        errorNotify(
          error.errors?.[0]?.message ??
            'Please check the details you entered again!'
        );
      } else {
        errorNotify('Something went wrong, please try again later!');
      }
    }
  };

  const isFormValid =
    userDetails.username || userDetails.email || userDetails.password;

  const changeInputVisibility = (detail: keyof typeof isInputVisible) => {
    setIsInputVisible((prevState) => ({
      ...prevState,
      [detail]: !prevState[detail],
    }));
  };

  const resetInput = (detail: keyof typeof userDetails) => {
    setUserDetails((prevState) => ({ ...prevState, [detail]: '' }));
  };

  if (isLoadingDeletion || isLoadingEdit) {
    return <Spinner />;
  }

  return (
    <main className="flex flex-col items-center justify-center my-16">
      <h1 className="text-4xl font-bold mb-5">My Account</h1>
      <form onSubmit={handleSubmit}>
        <EditSection
          placeholder="Username"
          type="text"
          name="username"
          value={userDetails.username}
          onChange={handleInputChange}
          isInputVisible={isInputVisible.username}
          changeInputVisibility={() => changeInputVisibility('username')}
          resetInput={() => resetInput('username')}
        />
        <EditSection
          placeholder="email"
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          isInputVisible={isInputVisible.email}
          changeInputVisibility={() => changeInputVisibility('email')}
          resetInput={() => resetInput('email')}
        />
        <EditSection
          placeholder="password"
          type="password"
          name="password"
          value={userDetails.password}
          onChange={handleInputChange}
          isInputVisible={isInputVisible.password}
          changeInputVisibility={() => changeInputVisibility('password')}
          resetInput={() => resetInput('password')}
        />
        <div className="flex flex-col items-center justify-center space-y-6 mt-10">
          <button
            type="submit"
            className={`${
              isFormValid
                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                : 'bg-gray-400 cursor-not-allowed opacity-50 text-gray-600'
            }  font-bold py-2 px-4 rounded`}
            disabled={!isFormValid}
          >
            Edit Account
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => deleteUser()}
          >
            Delete Account
          </button>
        </div>
      </form>
    </main>
  );
};

export default AccountDetails;
