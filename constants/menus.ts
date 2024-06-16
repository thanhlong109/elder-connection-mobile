import images from './images';

export const UtilListItems = [
  {
    title: 'Chăm sóc người cao tuổi',
    extend: 'Theo ca',
    img: images.Icons.ElderCare,
    id: 1,
  },
  {
    title: 'Chăm sóc người cao tuổi',
    extend: 'Theo tháng',
    img: images.Icons.ElderCare,
    id: 2,
  },
  {
    title: 'Connector yêu thích',
    img: images.Icons.favorite,
    id: 3,
  },
  {
    title: 'Lịch sử thanh toán',
    img: images.Icons.sendMoney,
    id: 4,
  },
  {
    title: 'Hỗ trợ ngay',
    img: images.Icons.support,
    id: 5,
  },
];

export const profileList = [
  [
    {
      img: images.Icons.creditCard,
      title: 'Ví của tôi',
      href: '(profiles)/myWallet',
      id: 0,
      isDeveloping: false,
    },
    {
      img: images.Icons.findUser,
      title: 'Thông tin thành viên',
      href: 'person-infor',
      id: 1,
      isDeveloping: false,
    },
    {
      img: images.Icons.voucher,
      title: 'Gói ưu đãi',
      href: '',
      id: 2,
      isDeveloping: true,
    },
  ],
  [
    {
      img: images.Icons.trust,
      title: 'Connector yêu thích',
      href: '',
      id: 3,
      isDeveloping: true,
    },
    {
      img: images.Icons.denied,
      title: 'Danh sách connector chặn',
      href: '',
      id: 4,
      isDeveloping: true,
    },
  ],
  [
    {
      img: images.Icons.forwardArrow,
      title: 'Săn quà giới thiệu',
      href: '',
      id: 5,
      isDeveloping: true,
    },
    {
      img: images.Icons.onlineSupport,
      title: 'Trợ giúp',
      href: '',
      id: 6,
      isDeveloping: true,
    },
  ],
];

export const workList = [
  'Trông nom, trò chuyện, bầu bạn, đi dạo với người già.',
  'Chuẩn bị bữa ăn cho người già.',
  'Nâng trở hỗ trợ người già di chuyển.',
  'Hỗ trợ, giám sát người già uống thuốc thoe đơn.',
  'Thông báo tình trạng bệnh lý cho người thân và gọi hỗ trợ khi cần thiết.',
];

export const unWorkList = [
  'Nấu nướng, chế biến đồ ăn cho người già.',
  'dọn dẹp, vệ sinh nhà cửa.',
  'chăm sóc người già, bệnh nhân không còn nhận thức.',
  'Vệ sinh cho người già.',
  'Xoa bóp, massage, châm cứu, bấm huyệt.',
  'Hút rửa đờm đãi hồi phục chức năng hô hấp cho người già.',
  'Thực hiện chăm sóc y tế cho người già ( tiêm thuốc, truyền dịch, thay băng cắt chỉ,... ).',
];
