import { NgModule } from "@angular/core";
import { PadNumberPipe } from "./lib";
import { FormatHoursPipe } from "./lib/format-hours.pipe";
import { PrecisionPipe } from "./lib/precision.pipe";
import { HourBadgeComponent, TimeBadgeComponent } from "./ui";

const pipes = [FormatHoursPipe, PrecisionPipe, PadNumberPipe];
const components = [HourBadgeComponent, TimeBadgeComponent];

@NgModule({
    declarations: [...components, ...pipes],
    exports: [...components, ...pipes],
})
export class SharedModule {}
