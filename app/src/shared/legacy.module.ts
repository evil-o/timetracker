import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";

import { ActivityTypeEntitiesModule } from "../entities/activity-type/activity-type-entities.module";
import { StopwatchComponent } from "./legacy/stopwatch/stopwatch.component";
import { SharedModule } from "./shared.module";

const legacyDeclarations = [
    // components
    StopwatchComponent,
];

// all things not yet ported to FSD, for import in the various modules, to ease the transition
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AccordionModule,
        TypeaheadModule,
        SharedModule,

        // temporary workarounds:
        ActivityTypeEntitiesModule,
    ],
    declarations: [...legacyDeclarations],
    exports: [...legacyDeclarations],
})
export class LegacyModule {}
