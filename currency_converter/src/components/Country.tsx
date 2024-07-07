/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


const Country = (props: any) => {
  return (
    <View>
      <Text style={styles.genText}>{props?.flag}</Text>
      <Text style={styles.genText}>{props?.name}</Text>
    </View>
  );
};

export default Country;

const styles = StyleSheet.create({
  genText:{
    textAlign:'center',
    fontWeight:'600'
  }
});
