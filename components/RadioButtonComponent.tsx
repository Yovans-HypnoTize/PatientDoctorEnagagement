import { View, StyleSheet } from 'react-native';
import React from 'react';
import RadioForm from 'react-native-simple-radio-button';

export default function RadioButtonComponent({handleGenderValue, items, selectedValue}:any) {
  return (
    <View style={styles.container}>
      <RadioForm
        radio_props={items}
        initial={0}
        updateIsActiveIndex={() => {return selectedValue}}
        onPress={(value: number) => handleGenderValue(value)}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={'#50C900'}
        selectedButtonColor={'#50C900'}
        animation={true}
        style={styles.radioForm}
        buttonSize={19}
        buttonOuterSize={19}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  radioForm: {
    justifyContent: 'space-between',
  },
});
