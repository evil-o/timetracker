import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ActivityPickerComponent } from "./ui";

const uis = [ActivityPickerComponent];

@NgModule({
    declarations: [...uis],
    exports: [...uis],
    imports: [FormsModule, TypeaheadModule],
})
export class ActivityTypesModule {}
