import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "precision",
})
export class PrecisionPipe implements PipeTransform {
    public transform(value: number, precision = 0): number {
        const mul = Math.pow(10, precision);
        return Math.round(value * mul) / mul;
    }
}
