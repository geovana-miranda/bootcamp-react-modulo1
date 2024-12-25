const months = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

export function getMonth(monthNumber) {
  return months[monthNumber - 1] ?? "?";
}

export function formatMoney(value) {
  return new Intl.NumberFormat("pt-BR", {currency: "BRL", style: "currency",}).format(value); 
}

export function formatPercent(percentage) {
  return percentage.toFixed(2).replace(".", ",") + "%";
}