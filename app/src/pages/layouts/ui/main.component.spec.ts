import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { ApplicationState } from "../../../entities/application";
import { StorageVersion } from "../../../entities/storage-version";
import { MainComponent } from "./main.component";

describe(MainComponent.name, () => {
    const create = createComponentFactory({
        component: MainComponent,
        providers: [
            provideMockStore<Partial<ApplicationState>>({
                initialState: { storageVersion: new StorageVersion() },
            }),
        ],
        shallow: true,
    });

    let spectator: Spectator<MainComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create the app", () => {
        expect(spectator.component).toBeTruthy();
    });
});
