export function difference<T>(arrayA: T[], arrayB: T[]): T[] {
  const setB = new Set(arrayB);
  return arrayA.filter((x) => !setB.has(x));
}
