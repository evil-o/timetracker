import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    Signal,
} from "@angular/core";
import { IActivityTypes } from "../../../../entities/activity-type";
import { Nullish } from "../../../../shared/models";
import { ITagTally, TagTallies } from "../../model/tag-tally";

interface IFlattenedTally {
    tag: string;
    tally: ITagTally;
}

@Component({
    selector: "app-tag-tally",
    templateUrl: "./tag-tally.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagTallyComponent {
    public tallies = input.required<TagTallies | Nullish>();

    public activityTypes = input.required<IActivityTypes | Nullish>();

    protected flattenedTallies: Signal<IFlattenedTally[]> = computed(() => {
        const tallies = this.tallies();
        const flattened: IFlattenedTally[] = [];

        if (tallies) {
            for (const tag of Object.keys(tallies).sort()) {
                flattened.push({ tag, tally: tallies[tag] });
            }
        }

        return flattened;
    });

    protected activityTypeIdToName(id: string): string {
        const types = this.activityTypes();
        if (!types) {
            return "??";
        }
        return types.activities.find((a) => a.id === id)?.name ?? "?";
    }
}
