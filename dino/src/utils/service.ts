export async function fetchData() {
  const response = await fetch("http://localhost:6060/transactions");
  const data = await response.json();
  return data;
}

export const myEmptyDinoArray = Array.from({ length: 40 }, () => ({
  walletaddress: "empty",
  ethervalue: "empty",
  value: "empty",
}));
