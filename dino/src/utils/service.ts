export async function fetchData() {
  const response = await fetch(
    "http://localhost:6060/transactions?dateFrom=2023-02-18&dateTo=2023-02-19"
  );
  const data = await response.json();
  return data.sortedArr;
}

export const myEmptyDinoArray = Array.from({ length: 40 }, () => ({
  walletaddress: "empty",
  ethervalue: "empty",
  value: "empty",
}));
