import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles = '',
  textStyles = '',
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`items-center justify-center rounded-lg bg-primary px-6 py-4 ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      activeOpacity={0.7}
      disabled={isLoading}>
      <Text className={`text-buttonTextPrimary font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
