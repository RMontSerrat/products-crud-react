import uniqid from "uniqid";

export function generateUniqueId(): string {
  return uniqid("id-");
}

export function formatCurrency(value: string | number) {
  if (!value) return "";
  value = String(value).replace(/\D/g, "");

  while (value.length < 3) {
    value = "0" + value;
  }

  value = value.slice(0, -2) + "," + value.slice(-2);
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  value = value.replace(/^0+/, "");
  if (value.startsWith(",")) {
    value = "0" + value;
  }

  return value;
}

export function formatBrazilianReal(value: string | number) {
  const number = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));

  return number;
}

export function fromBrazilianReal(value: string): number {
  let numeroStr = value.replace("R$", "").trim();

  numeroStr = numeroStr.replace(/\./g, "");

  numeroStr = numeroStr.replace(",", ".");
  const numeroFloat = parseFloat(numeroStr);

  return numeroFloat;
}
