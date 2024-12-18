import { Pipe, PipeTransform } from "@angular/core";
import { formatHours } from "./format-hours";

@Pipe({
    name: "formatHours",
    standalone: false,
})
export class FormatHoursPipe implements PipeTransform {
    public transform(
        totalHours: number | undefined | null,
        format = "{h}h {m}m"
    ): string {
        return formatHours(totalHours, format);
    }
}
