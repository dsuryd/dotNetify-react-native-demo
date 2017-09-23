import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import dotnetify from 'dotnetify';

import Authentication from '../Authentication';
import ScreenTracker from '../ScreenTracker';

export default class AFITop100Screen extends React.Component {
  static navigationOptions = {
    title: 'AFI Top 100'
  };

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate;
    this.state = { Movies: [] };

    const self = this;
    Authentication.getAccessToken()
      .then(token =>
        this.vm = dotnetify.react.connect("AFITop100ListVM", this, {
          vmArg: { RecordsPerPage: 20 },
          setState: this.updateMovies,
          headers: { Authorization: "Bearer " + token },
          exceptionHandler: ex => ScreenTracker.goToLoginScreen(self.navigate, ex)
        }));
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  updateMovies = newState => {
    const { Movies } = newState;
    newState.Movies = this.state.Movies.concat(Movies);
    this.setState(newState);
  }

  getMoreMovies = () => {
    if (this.state.CurrentPage < this.state.MaxPage)
      this.vm.$dispatch({ Next: null });
  }

  render() {
    if (!this.state.Movies.length)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.Movies}
          onEndReachedThreshold={0.5}
          onEndReached={this.getMoreMovies}
          keyExtractor={(item) => item.Rank}
          renderItem={({ item }) => {
            const navArg = { rank: item.Rank, title: `AFI #${item.Rank}` };
            return (
              <ListItem
                title={
                  <View style={styles.listItem}>
                    <Text style={styles.circle}>{item.Rank}</Text>
                    <Text>{item.Movie}</Text>
                  </View>
                }
                containerStyle={{ backgroundColor: 'white' }}
                onPress={() => this.navigate('AFIDetails', navArg)}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    flexDirection: 'row'
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    color: 'white',
    backgroundColor: '#00BCD4',
    textAlign: 'center',
    paddingTop: 2,
    marginRight: 10,
    marginTop: -1
  },
});