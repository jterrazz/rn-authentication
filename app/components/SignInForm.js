import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import firebase from "firebase";

const ROOT_URL =
  "https://us-central1-react-native-authenticat-a761d.cloudfunctions.net";

class SignInForm extends Component {
  state = { phone: "", code: "" };

  render() {
    return (
      <View>
        <Input
          style={{ marginBottom: 10 }}
          label="Enter Phone Number"
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        <Input
          style={{ marginBottom: 10 }}
          label="Enter Code"
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }

  handleSubmit = async () => {
    try {
      const { phone, code } = this.state;

      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone,
        code
      });

      firebase.auth().signInWithCustomToken(data.token);
    } catch (err) {
      console.log(err);
    }
  };
}

export default SignInForm;
