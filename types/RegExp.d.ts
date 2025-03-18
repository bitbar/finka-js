declare global {
  interface RegExpConstructor {
    escapeString(str: string): string
  }
}

export { };
