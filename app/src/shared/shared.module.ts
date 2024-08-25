import { NgModule } from "@angular/core";
import { PadNumberPipe } from "./lib";
import { FormatHoursPipe } from "./lib/format-hours.pipe";

const pipes = [PadNumberPipe, FormatHoursPipe];

@NgModule({
    declarations: [...pipes],
    exports: [...pipes],
})
export class SharedModule {}
