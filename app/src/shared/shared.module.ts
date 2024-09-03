import { NgModule } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";
import { PadNumberPipe } from "./lib";
import { FormatHoursPipe } from "./lib/format-hours.pipe";
import { PrecisionPipe } from "./lib/precision.pipe";
import {
    HourBadgeComponent,
    ModalHeaderComponent,
    QuickDayPickerComponent,
    TimeBadgeComponent,
} from "./ui";

const pipes = [FormatHoursPipe, PrecisionPipe, PadNumberPipe];
const components = [
    HourBadgeComponent,
    ModalHeaderComponent,
    QuickDayPickerComponent,
    TimeBadgeComponent,
];

@NgModule({
    declarations: [...components, ...pipes],
    exports: [...components, ...pipes],
    imports: [BsDatepickerModule, ModalModule],
})
export class SharedModule {}
