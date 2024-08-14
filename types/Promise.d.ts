declare global {
  // @ts-expect-error - Ignore TS2428 error
  interface Promise {
    isPromise<T = unknown>(subject: T): boolean
  }
}

export { };
