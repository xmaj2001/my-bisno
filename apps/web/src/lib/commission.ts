/**
 * Commission for one sale: the product's own percentage applied to the sale value.
 * Each product defines its own percentage; there is no fixed platform rate.
 */
export function commissionFor(saleValue: number, percent: number): number {
  if (!Number.isFinite(saleValue) || !Number.isFinite(percent)) return 0;
  if (saleValue <= 0 || percent <= 0) return 0;
  return Math.round(saleValue * percent) / 100;
}

export function formatKz(value: number): string {
  return `${new Intl.NumberFormat("pt-AO", { maximumFractionDigits: 0 }).format(value)} Kz`;
}
