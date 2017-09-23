import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import dotnetify from 'dotnetify';

import ScreenTracker from '../ScreenTracker';
import Authentication from '../Authentication';

const gaugeSize = 250;
const gaugeWidth = 20;
const cropDegree = 45;
const textOffset = gaugeWidth;
const textWidth = gaugeSize - (textOffset * 2);
const textHeight = gaugeSize * (1 - cropDegree / 360) - (textOffset * 2);

export default class LiveGaugeScreen extends React.Component {
  static navigationOptions = {
    title: "Live Gauge",
  };

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate;
    this.state = { Value: null };

    this.subscription = ScreenTracker.subscribe(this.connectLiveGauge);
  }

  componentWillUnmount() {
    this.vm && this.vm.$destroy();
    ScreenTracker.unsubscribe(this.subscription);
  }

  connectLiveGauge = screen => {
    const self = this;
    if (screen == "LiveGauge") {
      this.vm = dotnetify.react.connect("LiveGaugeVM", this, {
        exceptionHandler: ex => ScreenTracker.goToLoginScreen(self.navigate, ex)
      });
    }
    else if (this.vm) {
      this.vm.$destroy();
      this.vm = null;
    }
  }

  render() {
    if (!this.state.Value)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );

    return (
      <View style={styles.container}>
        <AnimatedGaugeProgress
          fill={this.state.Value}
          size={gaugeSize}
          width={gaugeWidth}
          cropDegree={cropDegree}
          tintColor="#9acfea"
          backgroundColor="#d9edf5"
          strokeCap="circle">
          {fill => (
            <View style={styles.digitalView}>
              <Text style={styles.digital}>{this.state.Value}</Text>
            </View>
          )}
        </AnimatedGaugeProgress>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  digitalView: {
    top: textOffset,
    left: textOffset,
    width: textWidth,
    height: textHeight,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  digital: {
    fontSize: 80
  }
});
