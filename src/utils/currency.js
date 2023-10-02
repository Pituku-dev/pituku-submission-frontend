export const rupiah = (num) => {
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);

  return formattedAmount
};
