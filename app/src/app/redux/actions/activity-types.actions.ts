import { createActionGroup, props } from "@ngrx/store";
import { IActivityTypes } from "../../../entities/activity-types/activity-types.types";

export const activityTypeActions = createActionGroup({
    source: "Activity Types",
    events: {
        setArchived: props<{ id: string; archived: boolean }>(),
        create: props<{ name: string }>(),
        /** default for createIfExists = true */
        createAndLogTime: props<{
            name: string;
            hours: number;
            date: Date;
            description?: string;
            createIfExists: boolean;
        }>(),
        setNonWorking: props<{ id: string; isNonWorking: boolean }>(),
        setColorId: props<{ activityTypeId: string; colorId?: string }>(),
        import: props<{ data: IActivityTypes }>(),
    },
});
