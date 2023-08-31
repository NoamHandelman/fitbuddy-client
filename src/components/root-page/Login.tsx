'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import useUserMutation from '@/hooks/user/useUserMutation';
import { loginUserSchema, registerUserSchema } from '@/schemas/user.schema';
import { ZodError } from 'zod';
import useNotification from '@/hooks/useNotification';
import Input from '../ui/Input';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  isRegisteredUser: true,
};

const Login = () => {
  const [userDetails, setUserDetails] = useState(initialState);

  const { loginUser, registerUser } = useUserMutation();

  const { errorNotify } = useNotification();

  const { isRegisteredUser, username, email, password, passwordConfirmation } =
    userDetails;

  const isFormValid =
    (isRegisteredUser && email && password) ||
    (!isRegisteredUser &&
      email &&
      password &&
      username &&
      passwordConfirmation);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const {
        username,
        email,
        password,
        passwordConfirmation,
        isRegisteredUser,
      } = userDetails;

      if (isRegisteredUser) {
        loginUserSchema.parse({ email, password });
        loginUser({ email, password });
      } else {
        registerUserSchema.parse({
          username,
          email,
          password,
          passwordConfirmation,
        });
        registerUser({ username, email, password, passwordConfirmation });
      }

      setUserDetails(initialState);
    } catch (error: unknown) {
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

  return (
    <section className="flex flex-col items-center w-96 justify-center p-8 rounded-lg shadow-lg bg-white">
      <h1 className="text-4xl font-bold mb-10">
        {userDetails.isRegisteredUser ? 'Login' : 'Register'}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-72 space-y-10 flex flex-col items-center"
      >
        {!userDetails.isRegisteredUser && (
          <Input
            placeholder="Username"
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleInputChange}
            autoFocus={true}
          />
        )}
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          autoFocus={true}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={userDetails.password}
          onChange={handleInputChange}
          autoFocus={false}
        />
        {!userDetails.isRegisteredUser && (
          <Input
            placeholder="Password Confirmation"
            type="password"
            value={userDetails.passwordConfirmation}
            name="passwordConfirmation"
            onChange={handleInputChange}
            autoFocus={false}
          />
        )}
        <button
          type="submit"
          className={` ${
            isFormValid
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-400  opacity-50 cursor-not-allowed'
          } w-full  text-white font-bold py-2 px-4 rounded`}
          disabled={!isFormValid}
        >
          {"Let's Go!"}
        </button>
        <p className="text-center">
          {userDetails.isRegisteredUser
            ? 'Not a buddy yet? '
            : 'Already a buddy? '}
          <button
            type="button"
            onClick={() =>
              setUserDetails((prevState) => ({
                ...prevState,
                isRegisteredUser: !prevState.isRegisteredUser,
              }))
            }
            className="text-blue-500 hover:text-blue-600 font-bold"
          >
            Click here
          </button>
        </p>
      </form>
    </section>
  );
};

export default Login;
