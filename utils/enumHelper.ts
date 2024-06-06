import { HomeType } from '~/enums';

export const getStringEnum = (homeType: HomeType) => {
  switch (homeType) {
    case HomeType.TOWN_HOUSE:
      return 'Nhà phố';
    case HomeType.APARTMENT:
      return 'Chung cư';
    case HomeType.MANSION:
      return 'Biệt thự';
  }
};
