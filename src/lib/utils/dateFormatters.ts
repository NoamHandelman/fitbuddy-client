import dayjs from 'dayjs';

export const formatPostDates = (
  createdAt: string,
  updatedAt: string | undefined
) => {
  const dateToFormat = updatedAt ? updatedAt : createdAt;
  return dayjs(dateToFormat).format('MMM D, YYYY h:mm A');
};

export const formatDateOfBirth = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY');
};
