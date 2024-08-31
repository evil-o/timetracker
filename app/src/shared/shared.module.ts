import { NgModule } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PadNumberPipe } from "./lib";
import { FormatHoursPipe } from "./lib/format-hours.pipe";
import { PrecisionPipe } from "./lib/precision.pipe";
import { HourBadgeComponent, TimeBadgeComponent } from "./ui";
import { QuickDayPickerComponent } from "./ui/quick-day-picker/quick-day-picker";

const pipes = [FormatHoursPipe, PrecisionPipe, PadNumberPipe];
const components = [
    HourBadgeComponent,
    QuickDayPickerComponent,
    TimeBadgeComponent,
];

@NgModule({
    declarations: [...components, ...pipes],
    exports: [...components, ...pipes],
    imports: [BsDatepickerModule],
})
export class SharedModule {}
