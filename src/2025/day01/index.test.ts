import { describe, it, expect } from 'vitest'
import { getCalibrationValue } from './index'

describe('getCalibrationValue', () => {
  it('should return the correct calibration value', () => {
    expect(getCalibrationValue('1abc2')).toBe(12)
    expect(getCalibrationValue('pqr3stu8vwx')).toBe(38)
    expect(getCalibrationValue('a1b2c3d4e5f')).toBe(15)
    expect(getCalibrationValue('treb7uchet')).toBe(77)
  })
})
