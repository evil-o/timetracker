import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import {
    ActivityTypes,
    IActivityTypesStateSlice,
} from "../../../../entities/activity-type";
import {
    IStopWatchStateSlice,
    StopWatch,
} from "../../../../entities/stop-watch";
import { StopwatchComponent } from "./stopwatch.component";

type StateSlice = IStopWatchStateSlice & IActivityTypesStateSlice;

describe(StopwatchComponent.name, () => {
    const create = createComponentFactory({
        component: StopwatchComponent,
        shallow: true,
        providers: [
            provideMockStore<StateSlice>({
                initialState: {
                    stopWatch: new StopWatch(),
                    activityTypes: new ActivityTypes(),
                },
            }),
        ],
    });
    let spectator: Spectator<StopwatchComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
