import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ActivityTypeIdToNamePipe } from "./lib/activity-type-id-to-name.pipe";
import { ActivityPickerComponent } from "./ui";

const uis = [ActivityPickerComponent];
const pipes = [ActivityTypeIdToNamePipe];

@NgModule({
    declarations: [...uis, ...pipes],
    exports: [...uis, ...pipes],
    imports: [FormsModule, TypeaheadModule],
})
export class ActivityTypeEntitiesModule {}
