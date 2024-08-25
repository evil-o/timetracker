import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ActivityColorPickerComponent } from "./ui/activity-color-picker/activity-color-picker.component";

const components = [ActivityColorPickerComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [BsDropdownModule, CommonModule],
})
export class AcivityColorFeaturesModule {}
