export async function getFoods({ order = "createdAt", cursor = "", limit = 5 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/7986/foods?${query}`);
  const body = await response.json();
  return body;
}
