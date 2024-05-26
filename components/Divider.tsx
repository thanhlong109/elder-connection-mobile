import { View, Text } from 'react-native';
import React from 'react';

interface DividerProps {
  vertical?: boolean;
  weight?: number;
}

const Divider = ({ vertical = false, weight = 1 }: DividerProps) => {
  return (
    <View
      className={`bg-gray-C5 ${vertical ? `h-full w-[${weight}px]` : `h-[${weight}px] w-full`}`}
    />
  );
};

export default Divider;
