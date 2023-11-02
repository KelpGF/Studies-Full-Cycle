export default interface UseCaseInterface<I=any, O=any> {
  execute(input: I): Promise<O>;
}
