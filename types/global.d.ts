declare global {
  interface globalThis {
    isNodeJs: boolean;
    getLanguage(): string;
    getCountry(): string | null,
    isNumeric<T = unknown>(n: T): boolean,
    parseValue<T = unknown>(value: T): T | number | boolean,
    md5(str: string): string
  }

  interface Window extends globalThis {
  }
}

export { };
