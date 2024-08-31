import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import {
    ConfigurationState,
    IConfigurationStateSlice,
} from "../../../entities/configuration";
import { ConfigurationComponent } from "./configuration.component";

type StateSlice = IConfigurationStateSlice;

describe(ConfigurationComponent.name, () => {
    const create = createComponentFactory({
        component: ConfigurationComponent,
        shallow: true,
        providers: [
            provideMockStore<StateSlice>({
                initialState: { configuration: new ConfigurationState() },
            }),
        ],
    });
    let specatator: Spectator<ConfigurationComponent>;

    beforeEach(() => {
        specatator = create();
    });

    it("should create", () => {
        expect(specatator.component).toBeTruthy();
    });
});
