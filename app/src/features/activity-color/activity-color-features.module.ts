import { NgModule } from "@angular/core";
import { ActivityColorPickerComponent } from "./ui/activity-color-picker/activity-color-picker.component";

const components = [ActivityColorPickerComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
})
export class AcivityColorFeaturesModule {}
