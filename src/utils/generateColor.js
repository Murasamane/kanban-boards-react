export function generateRandomColor() {
  let color = "#";
  const hexValues = "0123456789ABCDEF";

  for (let i = 0; i < 6; i++) {
    color += hexValues[Math.floor(Math.random() * 16)];
  }

  return color;
}
