import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from 'react-native-elements'
import dotnetify from 'dotnetify';

import ScreenTracker from '../ScreenTracker';

export default class AFIDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigation.navigate;
        this.state = { MovieDetails: { Cast: "" } };

        const self = this;
        const { rank } = props.navigation.state.params;
        this.vm = dotnetify.react.connect("AFIDetailsVM", this, {
            vmArg: { Rank: rank },
            exceptionHandler: ex => ScreenTracker.goToLoginScreen(self.navigate, ex)
        });
    }

    componentWillUnmount() {
        this.vm.$destroy();
    }

    render() {
        let item = this.state.MovieDetails;
        return (
            <View style={styles.container}>
                <Card title={item.Movie}>
                    <Text style={styles.header}>Year</Text>
                    <Text>{item.Year}</Text>
                    <Text style={styles.header}>Director</Text>
                    <Text>{item.Director}</Text>
                    <Text style={styles.header}>Cast</Text>
                    {item.Cast.split(',').map((cast, idx) => <Text key={idx}>{cast.trim()}</Text>)}
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    header: {
        fontWeight: 'bold',
        marginTop: 10
    }
});