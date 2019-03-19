import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import axios from "axios";

const ROOT_URL =
  "https://us-central1-react-native-authenticat-a761d.cloudfunctions.net";

class SignUpForm extends Component {
  state = { phone: "" };

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <Input
            label="Enter Phone Number"
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }

  handleSubmit = async () => {
    try {
      // await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      let response = await axios.post(`${ROOT_URL}/requestOneTimePassword`, {
        phone: this.state.phone
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
}

export default SignUpForm;
