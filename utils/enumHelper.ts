import { HomeType, ServiceType } from '~/enums';

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
export const getServiceTypeStringEnum = (serviceType: ServiceType) => {
  switch (serviceType) {
    case ServiceType.SERVICE_4:
      return '4 giờ';
    case ServiceType.SERVICE_8:
      return '8 giờ';
  }
};
