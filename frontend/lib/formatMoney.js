export default function formatMoney(pence = 0) {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  };

  /* check if whole pounds */
  if (pence % 100 === 0) options.minimumFractionDigits = 0;

  const formatter = new Intl.NumberFormat('en-GB', options);

  return formatter.format(pence / 100);
}
