import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export interface FormFieldProps {
  title?: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  secureTextEntry?: boolean;
}

const FormField = ({
  value,
  handleChangeText,
  placeholder = '',
  otherStyles = '',
  secureTextEntry = false,
  title = '',
}: FormFieldProps) => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-gray-100">{title}</Text>
      <View className="bg-gray h-16 w-full flex-row items-center rounded-2xl border-2 border-[#7D8FAB] px-4 focus:border-secondary ">
        <TextInput
          className="flex-1 font-psemibold text-base text-[#7D8FAB]"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7D8FAB"
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? 'eye' : 'eye-with-line'}
              size={24}
              color="#7D8FAB"
              className="h-6 w-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
