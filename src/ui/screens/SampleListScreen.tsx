import React from "react";
import { Text } from "react-native"
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../modules";

type Props = {
    texts: string[]
}

class Screen extends React.Component<Props> {
    render() {
        return (
            <Text>sample text</Text>
        );
    }
}

export const connector = connect(
    (state: RootState) => state,

    (dispatch: Dispatch) => ({
    })
);

export default connector(Screen);
