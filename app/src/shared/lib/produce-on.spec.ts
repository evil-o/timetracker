import { createAction, createReducer } from "@ngrx/store";
import { produceOn } from "./produce-on";

describe(produceOn.name, () => {
    it("does not mutate the original state", () => {
        const state = { someArray: [{ mock: "1" }] };
        const mockAction = createAction("mock action");
        const reducer = createReducer(
            state,
            produceOn(mockAction, (draft) => {
                draft.someArray[0].mock = "2";
            })
        );
        const result = reducer(state, mockAction());
        expect(state.someArray[0].mock).toBe("1");
        expect(result.someArray[0].mock).toBe("2");
    });
});
