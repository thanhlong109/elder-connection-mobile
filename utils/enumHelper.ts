import { HomeType, PostStatus, SERVICE_ID, ServicePackageType, ServiceType } from '~/enums';

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

export const getServiceTypeFromServiceStringEnum = (service: SERVICE_ID) => {
  switch (service) {
    case SERVICE_ID.SERVICE_DATE_4H:
    case SERVICE_ID.SERVICE_MONTH_4H:
      return '4 giờ';
    case SERVICE_ID.SERVICE_DATE_8H:
    case SERVICE_ID.SERVICE_MONTH_8H:
      return '8 giờ';
  }
};

export const getTimeFromServiceStringEnum = (service: SERVICE_ID) => {
  switch (service) {
    case SERVICE_ID.SERVICE_DATE_4H:
    case SERVICE_ID.SERVICE_MONTH_4H:
      return 4;
    case SERVICE_ID.SERVICE_DATE_8H:
    case SERVICE_ID.SERVICE_MONTH_8H:
      return 4;
  }
};

export const getStringPostStatusEnum = (status: PostStatus) => {
  switch (status) {
    case PostStatus.Posted:
    case PostStatus.Public:
      return 'Đang chờ';
    case PostStatus.Accepted:
      return 'Đã nhận';
    case PostStatus.Cancelled:
      return 'Đã hủy';
    case PostStatus.Completed:
      return 'Đã xong';
  }
};

export const getServiceIdByType = (serviceType: ServiceType, packageType: ServicePackageType) => {
  let selectedService = SERVICE_ID.SERVICE_DATE_4H;
  switch (serviceType) {
    case ServiceType.SERVICE_4: {
      selectedService =
        packageType === ServicePackageType.DAILY
          ? SERVICE_ID.SERVICE_DATE_4H
          : SERVICE_ID.SERVICE_MONTH_4H;
      break;
    }
    case ServiceType.SERVICE_8: {
      selectedService =
        packageType === ServicePackageType.DAILY
          ? SERVICE_ID.SERVICE_DATE_8H
          : SERVICE_ID.SERVICE_MONTH_8H;
      break;
    }
  }
  return selectedService;
};
