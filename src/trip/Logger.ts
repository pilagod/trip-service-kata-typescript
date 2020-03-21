export default interface Logger {
  log(message: string): void;
}

export class NullLogger implements Logger {
  public log(): void {
    return;
  }
}
