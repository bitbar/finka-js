declare global {
  interface ArrayConstructor {
    sortArrayOfObjects(arr: Object[], propertyName: string, descending?: boolean): void;
    deepCloneArrayOfObjects(arr: Object[]): Object[];
    wrap(arr: Array<any> | any): Array<any>;
    isEmpty: (arr: unknown) => boolean;
    isNotEmpty: (arr: unknown) => boolean;
    isInvalidOrEmpty: (arr: unknown) => boolean;
  }

  interface Array<T> {
    empty(): this,
    absorb(arr: Array<T>): this,
    diff(arr: Array<T>): Array<T>,
    clone(): Array<T>,
    lookFor(query: Object): number,
    filterLike: Array<T>,
    unique(): this,
    shuffle(): this,
  }
}

export { };
