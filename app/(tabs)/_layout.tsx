import { Tabs } from 'expo-router';
import { ImageSourcePropType, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#05b9b9',
          tabBarLabelStyle: {
            //fontFamily: "mon-sb",
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#232533',
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="action"
          options={{
            tabBarLabel: 'Hoạt động',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-list-outline" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            tabBarLabel: 'Thông Báo',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-outline" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-circle" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
