import { SafeAreaView } from 'react-native';

export const Container = ({ children, style }: { children: React.ReactNode; style?: string }) => {
  return <SafeAreaView className={`flex flex-1 bg-white ${style}`}>{children}</SafeAreaView>;
};
