declare global {
  interface ArrayConstructor {
    sortArrayOfObjects(arr: object[], propertyName: string, descending?: boolean): void;
    deepCloneArrayOfObjects(arr: object[]): object[];
    wrap<T = unknown>(arr: Array<T> | T): Array<T>;
    isEmpty(arr: unknown): boolean;
    isNotEmpty(arr: unknown): boolean;
    isInvalidOrEmpty(arr: unknown): boolean;
  }

  interface Array<T> {
    empty(): this,
    absorb(arr: Array<T>): this,
    diff(arr: Array<T>): Array<T>,
    clone(): Array<T>,
    lookFor(query: object): number,
    filterLike(query: Partial<T>): Array<T>,
    unique(): this,
    shuffle(): this,
  }
}

export { };
