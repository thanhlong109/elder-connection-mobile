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
