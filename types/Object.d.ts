declare global {
  interface ObjectConstructor {
    isObject(subject: any): boolean,
    copy(src: Object, dst: Object, what?: Readonly<Array<string>|null>): void,
    isLike(subject: Object, query: Object|any): boolean,
    count(subject: Object): number,
    values<T = any>(o: Object): Array<T>,
    assign(to: Object, ...args: Object): Object,
    deepAssign(to: Object, ...args: Object): Object,
    clone(o: Object): Object;
  }
}

export { };
