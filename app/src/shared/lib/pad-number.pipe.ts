import { Pipe, PipeTransform } from "@angular/core";

import { padNumber } from "./pad-number";

@Pipe({
    name: "padNumber",
    standalone: false,
})
export class PadNumberPipe implements PipeTransform {
    public transform(num: number, minLength = 2, padding = "0"): string {
        return padNumber(num, minLength || 2, padding);
    }
}
