/**
 * Formats a number as Nigerian Naira (NGN).
 * @param amount The number to format.
 * @returns A string representing the formatted currency (e.g., "₦2,500.00").
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};
