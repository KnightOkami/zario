const DEFAULT_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const TOKEN_PATTERN = /YYYY|MM|DD|HH|mm|ss|SSS/g;

const PAD2: string[] = new Array(60);
const PAD3: string[] = new Array(1000);

for (let i = 0; i < 60; i++) {
  PAD2[i] = i < 10 ? "0" + i : String(i);
}
for (let i = 0; i < 1000; i++) {
  PAD3[i] = i < 10 ? "00" + i : i < 100 ? "0" + i : String(i);
}

export class TimeUtil {
  static format(date: Date, format: string): string {
    if (format === "ISO") return date.toISOString();
    if (format === "UTC") return date.toUTCString();
    if (format === "LOCAL") return date.toLocaleString();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (format === DEFAULT_TIME_FORMAT) {
      return `${year}-${PAD2[month]}-${PAD2[day]} ${PAD2[hours]}:${PAD2[minutes]}:${PAD2[seconds]}`;
    }

    const ms = date.getMilliseconds();
    const tokens: Record<string, string> = {
      YYYY: String(year),
      MM: PAD2[month]!,
      DD: PAD2[day]!,
      HH: PAD2[hours]!,
      mm: PAD2[minutes]!,
      ss: PAD2[seconds]!,
      SSS: PAD3[ms]!,
    };

    return format.replace(TOKEN_PATTERN, (match) => tokens[match] || match);
  }
}
