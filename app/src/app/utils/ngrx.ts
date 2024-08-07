import { ActionCreator, ActionType, on } from "@ngrx/store";
import { Draft, produce } from "immer";

const producerOn = <S, A>(state: S, action: A, producer: (draft: Draft<S>, action: A) => void) => {
    return produce((d) => producer(d, action), state)();
}

export const produceOn = <S, Creator extends ActionCreator>(creator: Creator, reducer: (draft: Draft<S>, action: ActionType<Creator>) => void) => on(creator, (state: S, action: ActionType<Creator>) => {
    return producerOn(state, action, reducer);
});