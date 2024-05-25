import { DateStringType } from '~/enums';
interface DateString {
  short: string;
  full: string;
}

const dateString: DateString[] = [
  {
    short: 'CN',
    full: 'Chủ Nhật',
  },
  {
    short: 'T2',
    full: 'Thứ 2',
  },
  {
    short: 'T3',
    full: 'Thứ 3',
  },
  {
    short: 'T4',
    full: 'Thứ 4',
  },
  {
    short: 'T5',
    full: 'Thứ 5',
  },
  {
    short: 'T6',
    full: 'Thứ 6',
  },
  {
    short: 'T7',
    full: 'Thứ 7',
  },
];

export const getDateString = (number: number, type?: DateStringType) => {
  if (type === DateStringType.FULL) {
    return dateString[number].full;
  }
  return dateString[number].short;
};

// Type guard to check if a variable is a Date
export const isDate = (date: string | Date): date is Date => {
  return date instanceof Date;
};

// Type guard to check if a variable is a string
export const isString = (date: string | Date): date is string => {
  return typeof date === 'string';
};

export const formatDateTime = (date: Date) => {
  // Format the date
  const formattedDate = date.toLocaleDateString('en-GB'); // This will format the date to DD/MM/YYYY

  // Format the time
  const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // This will format the time to HH:MM

  // Combine the formatted date and time
  const formattedDateTime = `${formattedTime} - ${formattedDate}`;
  return formattedDateTime;
};
