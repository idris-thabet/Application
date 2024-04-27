import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CongePicker = ({ onSelect }) => {
  const conges = [
    '...........',
    'Congé annuel',
    'Congé maladie',
    'Congé de maternité',
    'Congé de paternité',
    'Congé parental',
    'Congé sabbatique',
    'Congé sans solde',
    'Congé de deuil',
    'Congé de mariage',
    'Congé de formation'
  ];

  const [selectedValue, setSelectedValue] = useState();

  return (
    <SafeAreaView>
      <View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onSelect(itemValue);
          }}
          style={{ backgroundColor: '#2C2C2C', borderRadius: 50}}
          itemStyle={{ fontSize: 24, color: 'white' }}
        >
          {conges.map(conge => (
            <Picker.Item key={conge} label={conge} value={conge} />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  );
};

export default CongePicker;
