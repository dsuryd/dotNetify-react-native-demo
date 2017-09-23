import React from 'react';
import { Alert, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import dotnetify from 'dotnetify';

import AppNavigation from './src/AppNavigation';
import ScreenTracker from './src/ScreenTracker';
import Authentication from './src/Authentication';

const androidEmulatorServerUrl = "http://169.254.80.80:5000"; 
const liveServerUrl = "http://dotnetify.net"; 
const serverUrl = Platform.OS === 'android' ? androidEmulatorServerUrl : liveServerUrl;

dotnetify.debug = true;
dotnetify.hubServerUrl = serverUrl + "/signalr";
dotnetify.hubOptions.pingInterval = 60000;

Authentication.url = serverUrl + "/token";

export default class App extends React.Component {
  state = { appLoaded: false, connectionStatus: null };

  constructor(props) {
    super(props);

    dotnetify.connectionStateHandler = (state, ex) => {
      this.setState({ connectionStatus: state == "connected" ? null : state });
      if (state == "error")
        Alert.alert("Connection Error", ex.message, [{ text: 'OK' }], { cancelable: false });
    };
  }

  componentWillMount() {
    Font.loadAsync(Ionicons.font);
    this.setState({ appLoaded: true });
    ScreenTracker.setScreen("LiveGauge");
  }

  handleNavigationStateChange(prevState, newState) {
    ScreenTracker.setScreen(newState);
  };

  render() {
    if (!this.state.appLoaded)
      return <AppLoading />;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        {this.state.connectionStatus ? <Text style={styles.error}>{this.state.connectionStatus}</Text> : null}
        <AppNavigation onNavigationStateChange={this.handleNavigationStateChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  error: {
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center'
  }
});
