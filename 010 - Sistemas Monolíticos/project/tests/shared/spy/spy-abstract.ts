interface SpyInterface<I, O> {
  call(input: I): O;
  calledWith(): I;
  timesCalled(): number;
  outputMustBeenNull(): void;
  outputMustBeenThrowError(error?: Error): void;
  outputMustBeenOutput(): void;
}

export abstract class SpyAbstract<I, O> implements SpyInterface<I, O> {
  private input: I = null as any;
  private output: O = null as any;
  private count: number = 0;
  private error: Error = new Error();
  private returnNull: boolean = false;
  private throwError: boolean = false;

  constructor(output: O, error?: Error) {
    this.output = output;

    if (error) this.error = error;
  }

  calledWith(): I {
    return this.input;
  }

  timesCalled(): number {
    return this.count;
  }

  outputMustBeenNull(): void {
    this.returnNull = true;
  }

  outputMustBeenThrowError(error?: Error): void {
    this.returnNull = false;
    this.throwError = true;

    if (error) this.error = error;
  }

  outputMustBeenOutput(): void {
    this.returnNull = false;
    this.throwError = false;
  }

  call(input: I): O {
    this.count++;
    this.input = input;

    if (this.returnNull) return null as any;
    if (this.throwError) throw this.error;

    return this.output;
  }
}
