import { User } from './user';

export type Profile = {
  user: User;
  bio?: string;
  profession?: string;
  education?: string;
  birthDate?: string;
  residence?: string;
  favoriteSport: string;
};
