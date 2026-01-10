export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}
