/**
 * Handle event
 */
export const convertToBoolean = (value?: string | number | boolean): boolean =>
  ![false, 0, '0', 'false', undefined].includes(value)
