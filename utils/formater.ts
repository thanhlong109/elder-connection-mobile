export function formatNumberToMoney(number: number): string {
  if (isNaN(number)) {
    return '0';
  }
  // Làm tròn số với 2 chữ số phần thập phân
  const roundedNumber = number.toFixed(2);

  // Định dạng số với dấu phân cách hàng nghìn
  const formattedNumber = new Intl.NumberFormat('en-US').format(Number(roundedNumber));

  // Kiểm tra nếu phần thập phân chỉ chứa 2 số 0 thì loại bỏ nó
  if (roundedNumber.endsWith('.00')) {
    return formattedNumber.split('.')[0]; // Lấy phần trước dấu chấm
  }

  return formattedNumber;
}

export function parseMoneyToNumber(money: string): number {
  // Xóa dấu phân cách hàng nghìn (dấu phẩy)
  const normalizedMoney = money.replace(/,/g, '');

  // Chuyển đổi chuỗi thành số thực
  const number = parseFloat(normalizedMoney);

  return number;
}
