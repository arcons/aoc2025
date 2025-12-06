export function getCalibrationValue(line: string): number {
  const digits = line.split('').filter(char => /\d/.test(char))
  if (digits.length === 0) {
    return 0
  }
  const firstDigit = digits[0]
  const lastDigit = digits[digits.length - 1]
  return parseInt(`${firstDigit}${lastDigit}`, 10)
}
