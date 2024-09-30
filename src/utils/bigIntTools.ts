export const bigIntMax = (...args: bigint[]) =>
  args.reduce((m, e) => (e > m ? e : m), args[0]);
export const bigIntMin = (...args: bigint[]) =>
  args.reduce((m, e) => (e < m ? e : m), args[0]);
