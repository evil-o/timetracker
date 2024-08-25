import { NgModule } from "@angular/core";
import { ActivityColorPickerComponent } from "./activity-color";

const components = [ActivityColorPickerComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
})
export class FeaturesModule {}
