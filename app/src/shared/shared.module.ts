import { NgModule } from "@angular/core";
import { PadNumberPipe } from "./lib";
import { FormatHoursPipe } from "./lib/format-hours.pipe";
import { PrecisionPipe } from "./lib/precision.pipe";

const pipes = [FormatHoursPipe, PrecisionPipe, PadNumberPipe];

@NgModule({
    declarations: [...pipes],
    exports: [...pipes],
})
export class SharedModule {}
