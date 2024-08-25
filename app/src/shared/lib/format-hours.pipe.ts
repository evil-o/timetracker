import { Pipe, PipeTransform } from "@angular/core";
import { padNumber } from "./pad-number";

@Pipe({
    name: "formatHours",
})
export class FormatHoursPipe implements PipeTransform {
    transform(
        totalHours: number | undefined | null,
        format = "{h}h {m}m"
    ): string {
        if (totalHours === undefined || totalHours === null) {
            return "-";
        }
        const negative = totalHours < 0;
        if (negative) {
            totalHours *= -1;
        }
        const hours = Math.floor(totalHours);
        const totalMinutes = (totalHours - hours) * 60;
        // round to about 5 digit precision to avoid issues with minute precision
        const minutes = Math.floor(Math.round(10000 * totalMinutes) / 10000);
        const totalSeconds = (totalMinutes - minutes) * 60;
        const seconds = Math.floor(totalSeconds);
        let hourPrefix = "";
        if (negative) {
            hourPrefix = "-";
        }
        const plusH = negative ? "" : "+";
        let formatted = format;
        formatted = formatted.replace(
            "{hh}",
            hourPrefix + padNumber(hours, 2, "0")
        );
        formatted = formatted.replace("{h}", hourPrefix + hours.toString());
        formatted = formatted.replace(
            "{+h}",
            plusH + hourPrefix + hours.toString()
        );
        formatted = formatted.replace("{m}", padNumber(minutes, 2, "0"));
        formatted = formatted.replace("{s}", padNumber(seconds, 2, "0"));
        return formatted;
    }
}
