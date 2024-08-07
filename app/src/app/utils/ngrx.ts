import { produce } from "immer";

export const producerOn = <S>(state: S, producer: (draft: S) => void) => {
    return produce(producer, state)();
}
