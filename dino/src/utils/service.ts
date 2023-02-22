export async function fetchData(fetchPath: string) {
    const response = await fetch(fetchPath);
    const data = await response.json();
    return data.sortedArr;
  }