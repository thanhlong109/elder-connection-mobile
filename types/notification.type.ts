import { NotificationType } from '~/enums';

export interface Notification {
  notificationId: number;
  sendDate: Date;
  message: string;
  isRead: boolean;
  type: NotificationType;
  title: string;
  action: string;
}
