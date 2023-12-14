export default function deepEquailty(
  obj1: Record<string, string>,
  obj2: Record<string, string>
) {
  const keys1 = Object.keys(obj1);
  const keys2 = new Set(Object.keys(obj2));

  const keysMatch = keys1.every((key) => keys2.has(key));

  if (!keysMatch) return false;

  console.log(keysMatch,  keys1.every((key) => obj1[key] === obj2[key]));

  return keys1.every((key) => obj1[key] === obj2[key]);
}
