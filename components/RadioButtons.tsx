import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const RadioButtons = ({ genderValue, items, handleGenderValue }: any) => {
    const [selected, setSelected] = useState<any>(genderValue);
    useEffect(() => {
        setSelected(genderValue);
    }, [genderValue]);
    return (
        <View style={styles.container}>
            {
                items.map((item: any, index: number) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setSelected(item.value);
                            handleGenderValue(item.value);
                        }} style={styles.radioBtnContainer} key={item.id || index}>
                            <View style={styles.radioWrapper}>
                                <View style={styles.radioButton}>
                                    {selected === item.value ? <View style={styles.selected} /> : null}
                                </View>
                                <Text style={styles.text}>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
};

export default RadioButtons;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'center',
    },
    radioBtnContainer: {
        marginRight: 20,
    },
    radioWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    radioButton: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'green',
    },
    selected: {
        borderColor: 'green',
        backgroundColor: 'green',
        flex: 1,
        height: 21,
        width: 21,
        borderWidth: 1,
        borderRadius: 20,
    },
    text: {
        marginLeft: 8,
    },
})