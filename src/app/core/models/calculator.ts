export interface Calculator<TInput, TResult> {
  calculate(inputs: TInput): TResult;
}
