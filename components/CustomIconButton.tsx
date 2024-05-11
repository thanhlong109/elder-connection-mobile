import { View, Text } from 'react-native';
import React from 'react';
export interface CustomIconButtonProps {
  icon?: React.ReactNode;
  title?: string;
  containerStyle?: string;
  extend?: string;
  onPress?: () => void;
}
const CustomIconButton = ({
  icon,
  title,
  extend,
  containerStyle = '',
  onPress,
}: CustomIconButtonProps) => {
  return (
    <View onPointerEnter={() => onPress?.()} className={`items-center  ${containerStyle}`}>
      <View
        className={`h-[50px] w-[50px] items-center justify-center rounded-lg bg-primary p-[10px]`}>
        {icon}
      </View>
      <Text className="mt-2 text-center font-pregular text-sm text-textPrimary">
        {title}
        {`${extend ? ' - ' : ''}`}
        <Text className=" text-secondary">{extend ? extend : ''}</Text>
      </Text>
    </View>
  );
};

export default CustomIconButton;
