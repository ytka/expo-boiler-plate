import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("Application");

export const actions = {
    INITIALIZE: actionCreator("INITIALIZE"),
    INITIALIZE_COMPLETE: actionCreator("INITIALIZE_COMPLETE"),
    SELECT_TAB: actionCreator<string>("SELECT_TAB"),
};
