declare global {
  interface Math {
    rand(): number,
    log10(x: number): number,
    roundTo(num: number, precision: number): number,
    median(values: number[]): number,
    sum(values: number[]): number,
    avg(values: number[]): number
  }
}

export { };
