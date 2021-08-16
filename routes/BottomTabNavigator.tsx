import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigatorScreenParams } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity, View, Text, Platform } from 'react-native';

// import { LocaleKeys } from '../localization/LocaleKeys';
// import { Translate } from '../localization/Translate';
import { HomeStackParamList, HomeTab } from './HomeTab';
import Routes from './Routes';
import { Colors } from '../constants/Colors';
import { ServicesStackParamList, ServicesTab } from './ServicesTab';
import { VideosTabs } from './VideosTabs';
import { ImagesTab } from './ImagesTab';
import { ShopTab } from './ShopTab';
import { TabBarIcon } from '../components/Styled';

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ServicesTab: NavigatorScreenParams<ServicesStackParamList>;
  ImagesTab: undefined;
  VideosTab: undefined;
  ShopTab: undefined;
};

function TabBar({ state, descriptors, navigation }: any) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{
      bottom: 0,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 0,
      right: 0,
      position: "absolute",
      height: 100,
      zIndex: 2,
      width: "100%"
    }}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#000',
          height: 80,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}>
      </View>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            activeOpacity={0.8}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'space-between',}}>
            {route.name === Routes.HomeTab && (
              <TabBarIcon
                style={{
                  position: 'relative',
                  zIndex: 100,
                  alignSelf: 'center',
                  top: isFocused ? (Platform.OS === 'ios' ? -20 : -10) : 0,
                }}
                source={require('../assets/BottomIcons/home.png')}
                testID="homeIcon"
                color={Colors.primary}
              />
            )}
            {route.name === Routes.ServicesTab && (
              <TabBarIcon
                style={{
                  position: 'relative',
                  zIndex: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: isFocused ? (Platform.OS === 'ios' ? -20 : -10) : 0,
                }}
                source={require('../assets/BottomIcons/services.png')}
                testID="serviceIcon"
                color={Colors.primary}
              />
            )}
            {route.name === Routes.VideosTab && (
              <TabBarIcon
                style={{
                  position: 'relative',
                  zIndex: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: isFocused ? (Platform.OS === 'ios' ? -20 : -10) : 0,
                }}
                source={require('../assets/BottomIcons/videos.png')}
                testID="videosIcon"
                color={Colors.primary}
              />
            )}
            {route.name === Routes.ImagesTab && (
              <TabBarIcon
                style={{
                  position: 'relative',
                  zIndex: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: isFocused ? (Platform.OS === 'ios' ? -20 : -10) : 0,
                }}
                source={require('../assets/BottomIcons/images.png')}
                testID="imagesIcon"
                color={Colors.primary}
              />
            )}
            {route.name === Routes.ShopTab && (
              <TabBarIcon
                style={{
                  position: 'relative',
                  zIndex: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: isFocused ? (Platform.OS === 'ios' ? -20 : -10) : 0,
                }}
                source={require('../assets/BottomIcons/shop.png')}
                testID="shopIcon"
                color={Colors.primary}
              />
            )}
            <View
              style={{
                backgroundColor: isFocused ? Colors.secondary : '#777',
                alignSelf: 'center',
                borderRadius: isFocused ? 30 : 0,
                height: isFocused ? 60 : 0,
                width: 60,
                alignItems: 'center',
                position: 'absolute',
                zIndex: 1,
                top: Platform.OS === 'ios' ? -40 : -25,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                color: isFocused ? 'transparent' : '#fff',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    if (routeName === 'shopDetail') {
      return false;
    }

    return true;
  };


  return (
    <BottomTab.Navigator
      initialRouteName={Routes.HomeTab}
      tabBar={props => <TabBar {...props} />}>
      <BottomTab.Screen
        name={Routes.HomeTab}
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          // tabBarLabel: Translate(LocaleKeys.loginScreen.email),
        }}
      />
      <BottomTab.Screen
        name={Routes.ServicesTab}
        component={ServicesTab}
        options={{
          tabBarLabel: 'Services',

          // tabBarLabel: Translate(LocaleKeys.loginScreen.email),
        }}
      />
      <BottomTab.Screen
        name={Routes.VideosTab}
        component={VideosTabs}
        options={{
          tabBarLabel: 'Videos',

          // tabBarLabel: Translate(LocaleKeys.loginScreen.email),
        }}
      />
      <BottomTab.Screen
        name={Routes.ImagesTab}
        component={ImagesTab}
        options={{
          tabBarLabel: 'Images',
          // tabBarLabel: Translate(LocaleKeys.loginScreen.email),
        }}
      />
      <BottomTab.Screen
        name={Routes.ShopTab}
        component={ShopTab}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Shops'

        })}
      //   // tabBarLabel: Translate(LocaleKeys.loginScreen.email),
      // }}
      />
    </BottomTab.Navigator>
  );
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

export default BottomTabNavigator;
