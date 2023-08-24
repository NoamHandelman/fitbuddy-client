import { z } from 'zod';

export const registerUserSchema = z
  .object({
    username: z
      .string({
        required_error: 'Please provide username!',
      })
      .max(20, 'Username can not contain more then 20 characters!')
      .nonempty('Username can not be empty!'),
    email: z
      .string({
        required_error: 'Please provide email!',
      })
      .email('Please provide a valid email!'),
    password: z
      .string({
        required_error: 'Please provide password!',
      })
      .min(6, 'Password too short, please provide minimum 6 chars!'),
    passwordConfirmation: z.string({
      required_error: 'Password Confirmation is required!',
    }),
  })
  .refine((input) => input.password === input.passwordConfirmation, {
    message: 'Passwords are not match!',
    path: ['passwordConfirmation'],
  });

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Please provide email!',
    })
    .email('Please provide a valid email!'),
  password: z.string({
    required_error: 'Please provide password!',
  }),
});

export const editUserSchema = z.object({
  username: z
    .string()
    .max(20, 'Username can not contain more then 20 characters!')
    .nonempty('Username can not be empty!')
    .optional(),
  email: z.string().email('Please provide a valid email!').optional(),
  password: z
    .string()
    .min(6, 'Password too short, please provide minimum 6 chars!')
    .optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type LoginUserInput = z.infer<typeof loginUserSchema>;

export type EditUserInput = z.infer<typeof editUserSchema>;
