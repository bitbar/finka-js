declare global {
  interface globalThis {
    isNodeJs: boolean;
    getLanguage(): string;
    getCountry(): string | null,
    isNumeric(n: any): boolean,
    parseValue(value: any): any,
    md5(str: string): string
  }
}

export { };
