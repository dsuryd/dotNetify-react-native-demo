import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import LiveGaugeScreen from './screens/LiveGaugeScreen';
import AFITop100Screen from './screens/AFITop100Screen';
import AFIDetailsScreen from './screens/AFIDetailsScreen';

const tabNavigation = TabNavigator(
  {
    AFITop100: { screen: AFITop100Screen },
    LiveGauge: { screen: LiveGaugeScreen }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;
        const isIos = Platform.OS === 'ios';
        const iosIconSuffix = focused ? '' : '-outline';

        switch (navigation.state.routeName) {
          case 'LiveGauge': iconName = isIos ? `ios-speedometer${iosIconSuffix}` : 'md-speedometer'; break;
          case 'AFITop100': iconName = isIos ? `ios-list-box${iosIconSuffix}` : 'md-list-box'; break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? '#92d050' : '#ccc'}
          />
        );
      },
    }),
    tabBarOptions: { activeTintColor: '#7ebc3c' },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
  }
);

export default StackNavigator(
  {
    Login: { screen: LoginScreen },
    Main: { screen: tabNavigation },
    AFIDetails: {
      screen: AFIDetailsScreen,
      navigationOptions: ({ navigation }) => ({ title: `${navigation.state.params.title}` }),
    }
  }
);
