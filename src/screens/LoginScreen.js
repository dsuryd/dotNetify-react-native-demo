import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import dotnetify from "dotnetify";

import Authentication from "../Authentication";
import ScreenTracker from "../ScreenTracker";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate;
    this.state = {
      exception: this.getNavException(props.navigation.state.params)
    };
  }

  login = () => {
    let self = this;
    this.setState({ validationError: null, exception: null });

    Authentication.signIn(this.state.user, this.state.password)
      .then(() => self.navigate("Main"))
      .catch(error => {
        if (error.message == "401")
          this.setState({ validationError: "Invalid user name or password" });
        else
          this.setState({ exception: error.message });
      });
  }

  getNavException = ex => {
    if (!ex)
      return null;
    return (ex.name == "UnauthorizedAccessException" || ex == "SecurityTokenExpiredException") ?
      "Access expired. Please re-login."
      : ex.message;
  }

  render() {
    const handleUserInput = user => this.setState({ user: user });
    const handlePasswordInput = pwd => this.setState({ password: pwd });
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.logo} />
          <Text style={styles.text}>dotNetify</Text>
        </View>
        <Card title="dotnetify-react-native-demo">
          {this.state.exception ? <FormValidationMessage>{this.state.exception}</FormValidationMessage> : null}
          <FormLabel>User Name</FormLabel>
          <FormInput placeholder="Type guest..." onChangeText={handleUserInput} />
          {this.state.validationError ? <FormValidationMessage>{this.state.validationError}</FormValidationMessage> : null}
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Type dotnetify..." onChangeText={handlePasswordInput} />
          {this.state.validationError ? <FormValidationMessage>{this.state.validationError}</FormValidationMessage> : null}
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor='#03A9F4'
            title="Sign In"
            onPress={() => this.login()}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#ddd"
  },
  title: {
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row'
  },
  logo: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#92d050',
    marginTop: 22,
    marginRight: 6
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  }
});