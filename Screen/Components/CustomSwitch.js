import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CustomSwitch = ({
    navigation,
    selectionMode,
    roundCorner,
    option1,
    option2,
    onSelectSwitch,
    selectionColor
}) => {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
    const [getRoundCorner, setRoundCorner] = useState(roundCorner);

    const updatedSwitchData = val => {
        setSelectionMode(val);
        onSelectSwitch(val);
    };

    return (
        <View>
            <View
                style={{
                    height: 50,
                    width: "100%",
                    backgroundColor: 'white',
                    borderRadius: getRoundCorner ? 25 : 0,
                    borderWidth: 1,
                    borderColor: selectionColor,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderRadius:4,
                    // padding: 2,
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updatedSwitchData(1)}
                    style={{
                        flex: 1,

                        backgroundColor: getSelectionMode == 1 ? selectionColor : 'white',
                        borderRadius: getRoundCorner ? 25 : 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius:4

                    }}>
                    <Text
                        style={{
                            color: getSelectionMode == 1 ? '#8f90aa' : '#848df7',
                            fontWeight:'bold'
                        }}>
                        {option1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updatedSwitchData(2)}
                    style={{
                        flex: 1,

                        backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',
                        borderRadius: getRoundCorner ? 25 : 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius:4
                    }}>
                    <Text 
                        style={{
                            color: getSelectionMode == 2 ? '#8f90aa' : '#848df7',
                            fontWeight:'bold'
                        }}>
                        {option2}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CustomSwitch;