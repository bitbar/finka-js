declare global {
  interface ObjectConstructor {
    isObject(subject: any): boolean,
    copy(src: Object, dst: Object, what?: Array<T>|null): void,
    isLike(subject: Object, query: Object|any): boolean,
    count(subject: Object): number,
    values(o: Object): Array<T>,
    assign(to: Object, ...args: Object): Object,
    deepAssign(to: Object, ...args: Object): Object,
    clone(o: Object): Object;
  }
}

export { };
