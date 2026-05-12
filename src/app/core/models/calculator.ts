export interface Calculator<TInput> {
  calculate(inputs: TInput): number;
}
