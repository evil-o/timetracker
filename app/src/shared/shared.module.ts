import { NgModule } from "@angular/core";
import { PadNumberPipe } from "./lib";

const pipes = [PadNumberPipe];

@NgModule({
    declarations: [...pipes],
    exports: [...pipes],
})
export class SharedModule {}
