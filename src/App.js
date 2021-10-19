import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SelectBox } from './components/SelectBox';

const data = [
  {
    id: 1,
    day: 'seg',
  },
  {
    id: 2,
    day: 'ter',
  },
  {
    id: 3,
    day: 'qua',
  },
  {
    id: 4,
    day: 'qui',
  },
  {
    id: 5,
    day: 'sex',
  },
]

export const App = () => {
  const [visible, setVisible] = useState(false);
  const [selecteds, setSelecteds] = useState([]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <SelectBox 
          keyIdentifier="id"
          itemKey="day"
          placeholder="Selecione um(ns) dia(s) da semana..."
          opacity={0.3}
          data={data}
          isVisible={visible}
          onChangeVisible={setVisible}
          selectItems={selecteds}
          setSelectItems={setSelecteds}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20
          }}
        >
          {JSON.stringify(selecteds)}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
