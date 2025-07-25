import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
];

const DropDown = () => {
  const [value, setValue] = useState<any>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        // style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        // placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        // placeholder={!isFocus ? 'Select item' : '...'}
        // searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        // renderLeftIcon={() => (
        //  <Text>k</Text>
        // )}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 8,
  },
  icon: {
    // marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});