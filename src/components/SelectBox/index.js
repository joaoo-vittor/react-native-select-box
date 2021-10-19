import P from 'prop-types';
import React, { useState, useRef } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');
const DROP_DOWN_HEIGHT = (height * 0.047) * 4;

export const SelectBox = (
  {
    placeholder="",
    opacity=0.1,
    data=[],
    isVisible=false,
    onChangeVisible=() => {},
    keyIdentifier="",
    itemKey="",
    setSelectItems=() => {},
  }
  ) => {
    
  const heightMod = useRef(new Animated.Value(0)).current;
  const marginBox = useRef(new Animated.Value(0)).current;
  const [selectedElements, setSelectedElements] = useState([[],[]]);
  const [checkUpdate, setCheckUpdate] = useState(false);

  const elementCheck = (item) => {
    setCheckUpdate(true);

    if (!selectedElements[1].includes(item[keyIdentifier])) {
      const arr = [
        [...selectedElements[0], item], 
        [...selectedElements[1], item[keyIdentifier]]
      ];
      setSelectedElements(() => arr);
    }
    
    if (selectedElements[1].includes(item[keyIdentifier])) {
      const indexToDelete = selectedElements[1].indexOf(item[keyIdentifier]);
      const newElements = selectedElements[0].filter((_, i) => i !== indexToDelete);
      const newIndexs = selectedElements[1].filter((_, i) => i !== indexToDelete);
      setSelectedElements(() => [newElements, newIndexs]);
    }

    setCheckUpdate(false);
  }

  const handlerChengeVisible = () => {
    setSelectItems(() => selectedElements[0]);
    
    if (!checkUpdate) onChangeVisible(false);
  }

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={() => onChangeVisible(true)}
        style={[
          {
            flexDirection: 'row',
            width: width * 0.9,
            height: height * 0.055,
            borderColor: '#000',
            borderWidth: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            position: 'absolute',
          }
        ]}
        onLayout={(event) => {
          heightMod.setValue(event.nativeEvent.layout.y);
          marginBox.setValue((event.nativeEvent.layout.width - width))
        }}
      >
        <Text
          style={[
            {
              color: '#ccc',
            }
          ]}
        >
          {placeholder}
        </Text>
        <Icon 
          name={isVisible ? 'chevron-up' : 'chevron-down'}
          size={25}
          color={'#000'}
        />
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        > 
        <TouchableOpacity
          onPress={handlerChengeVisible}
          style={{
            flex: 1,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            top: heightMod,
            marginTop: 3,
            left: width * 0.05,
            width: width * 0.9,
            height: DROP_DOWN_HEIGHT,
            borderWidth: 1,
            borderColor: '#000'
          }}
        >
          <FlatList 
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: height * 0.055,
                    borderBottomColor: '#000',
                    borderBottomWidth: 1,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    elementCheck(item);
                  }}
                >
                  <Text>{item[itemKey]}</Text>
                  {
                    selectedElements[1].includes(item[keyIdentifier]) 
                    ? <Icon
                        name="checkmark"
                        color="#000"
                        size={20}
                     />
                    : false
                  }
                </TouchableOpacity>
              )
            }}
          />
        </Animated.View> 
      </Modal>
    </View>
  )
}

SelectBox.propTypes = {
  placeholder: P.string,
  opacity: P.number,
  data: P.array,
  isVisible: P.bool,
  onChangeVisible: P.func,
  keyIdentifier: P.string,
  itemKey: P.string,
  setSelectItems: P.func,
};
