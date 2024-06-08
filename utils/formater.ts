export function formatNumberToMoney(number: number): string {
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
