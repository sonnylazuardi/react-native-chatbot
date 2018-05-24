import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert
} from "react-native";

export default class PaymentScreen extends React.Component {
  onSubmit() {
    const { navigation } = this.props;
    alert("Payment success");
    navigation.getParam("closeModal")();
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Payment"
  });
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Insert Credit Card</Text>
        <TextInput
          style={{ height: 32, width: 100, backgroundColor: "#fff" }}
        />
        <Button title={"Submit"} onPress={this.onSubmit.bind(this)} />
      </View>
    );
  }
}
