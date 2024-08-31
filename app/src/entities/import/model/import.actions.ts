import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const importActions = createActionGroup({
    source: "Import",
    events: {
        fromFile: props<{ fileContent: string }>(),
        fileSuccessfullyImported: emptyProps(),
    },
});
