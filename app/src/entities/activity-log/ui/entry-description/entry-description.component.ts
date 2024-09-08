import { Component, computed, input } from "@angular/core";
import { parseDescription, TAG_CHARACTER } from "../../lib/parse-description";
import { TokenType } from "../../models/description/token-type";

@Component({
    selector: "app-entry-description",
    templateUrl: "./entry-description.component.html",
})
export class EntryDescriptionComponent {
    public description = input.required<string>();

    protected TokenType = TokenType;

    protected TAG_CHARACTER = TAG_CHARACTER;

    protected parsedDescription = computed(() =>
        parseDescription(this.description())
    );
}
