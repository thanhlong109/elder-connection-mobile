export const getDateString = (number: number) => {
  var val = '';
  switch (number) {
    case 0: {
      val = 'CN';
      break;
    }
    case 1: {
      val = 'T2';
      break;
    }
    case 2: {
      val = 'T3';
      break;
    }
    case 3: {
      val = 'T4';
      break;
    }
    case 4: {
      val = 'T5';
      break;
    }
    case 5: {
      val = 'T6';
      break;
    }
    case 6: {
      val = 'T7';
      break;
    }
  }
  return val;
};

// Type guard to check if a variable is a Date
export const isDate = (date: string | Date): date is Date => {
  return date instanceof Date;
};

// Type guard to check if a variable is a string
export const isString = (date: string | Date): date is string => {
  return typeof date === 'string';
};
