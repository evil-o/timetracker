import { NgModule } from "@angular/core";
import { ActivityColorPickerComponent } from ".";

const components = [ActivityColorPickerComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
})
export class ActivityColorFeatureModule {}
