declare class DateHMSFormat {
  h: number;
  m: number;
  s: number;
  ms: number;
}

declare type DateAccuracy = 'hours' | 'minutes' | 'seconds';

declare global {
  interface DateConstructor {
    SECOND: number,
    MINUTE: number,
    HOUR: number,
    DAY: number,
    WEEK: number,
    TODAY: number,
    YESTERDAY: number,
    TOMORROW: number,
    DAYAFTERTOMORROW: number,

    parseValue(value: any): Date,
    daysFromNow(days: number): number,
    getLocalDateFormat(fullFormat?: boolean): string,
    getTimezoneName(): string,
    getHms(time: number): DateHMSFormat,
    toHmsFormat(time: number, accuracy?: DateAccuracy): string,
    toStopwatchFormat(time: number): string,
    toTimerFormat(time: number): string
  }

  interface Date {
    daysPassed(toDate: Date|string|number): number
    toCustomDate(format: string): string,
    toUiTime(showSeconds: boolean): string,
    toUiDate(): string,
    toUiDateTime(showSeconds?: boolean): string,
    toInputTimeFormat(): string,
    toInputDateFormat(): string,
    addTime(time: number): number
  }
}

export { };
