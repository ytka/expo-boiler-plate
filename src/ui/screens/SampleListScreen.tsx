import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native"
import { RootState } from "../../modules";

const applicationSelector = (state: RootState) => state.application;

export default function screen() {
    const speachText = useSelector(applicationSelector);
    const dispatch = useDispatch();

    return (
        <Text>sample text</Text>
    );
}
