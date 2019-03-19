import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import firebase from "firebase";

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCLqUIS2nFzLelt_3zQrb_GAgCgcgfuPb8",
      authDomain: "react-native-authenticat-a761d.firebaseapp.com",
      databaseURL: "https://react-native-authenticat-a761d.firebaseio.com",
      projectId: "react-native-authenticat-a761d",
      storageBucket: "react-native-authenticat-a761d.appspot.com",
      messagingSenderId: "970962654309"
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
