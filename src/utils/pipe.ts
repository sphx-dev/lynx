type TFunc = (arg: any) => any;

type PipeReturnType<T extends TFunc[]> = T extends [
  infer F extends TFunc,
  ...infer Rest extends TFunc[]
]
  ? Rest extends []
    ? ReturnType<F>
    : PipeReturnType<Rest>
  : never;

interface Pipe {
  <T extends TFunc[]>(value: any, ...funcs: T): PipeReturnType<T>;
}

export const pipe: Pipe = (value: any, ...funcs: TFunc[]) =>
  funcs.reduce((a, f) => f(a), value);
