declare global {
  interface StringConstructor {
    editDistance(a: string, b: string): number,
    getSimilarity(a: string, b: string): number,
    isEmpty: (sth: unknown) => boolean;
    isNotEmpty: (sth: unknown) => boolean;
    isInvalidOrEmpty: (sth: unknown) => boolean;
  }

  interface String {
    capitaliseFirstLetter(lower: boolean): string,
    lowerFirstLetter(): string,
    noCase(): string,
    toCamelCase(): string,
    toPascalCase(): string,
    toKebabCase(): string,
    toSnakeCase(convertToUpperCase: boolean): string,
    toChecksum(): string,
    toBoolean(): string,
    reverse(): string,
    isLike(query: string): boolean,
    includes(search: string, start?: number): boolean
  }
}

export { };
