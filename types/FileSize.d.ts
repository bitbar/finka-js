declare global {
  class FileSize {
    bytes: number;
    toReadableString(): string;
    static UNITS: string[];
    static B: number;
    static KB: number;
    static MB: number;
    static GB: number;
    static TB: number;
    static EB: number;
    static getReadableString(bytes: number): string;
  }
}

export { };
