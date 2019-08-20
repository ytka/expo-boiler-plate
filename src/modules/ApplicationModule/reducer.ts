import { Application } from "./interfaces";
import { actions } from "./actions";
import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";


const initial: Application = {
    selectedTab: "",
};

export const reducer = reducerWithInitialState(initial)
    .case(actions.SELECT_TAB, (state, payload) =>
        produce(state, draft => {
            draft.selectedTab = payload;
        })
    )
    ;
