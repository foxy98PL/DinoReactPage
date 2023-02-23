export async function fetchData(fetchPath: string) {
  const response = await fetch(fetchPath);
  const data = await response.json();
  return data.sortedArr;
}


export async function fetchDataLeader(fetchString: string) {
  try {
    const response = await fetch(fetchString);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
