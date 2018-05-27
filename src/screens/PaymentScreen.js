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
  onGoToProduct() {
    const { navigation } = this.props;
    navigation.navigate({
      key: "ProductDetail",
      routeName: "ProductDetail",
      params: {
        product: navigation.getParam("product")
      }
    });
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Payment",
    headerLeft: (
      <Button
        title="Close"
        onPress={() => navigation.getParam("closeModal")()}
      />
    )
  });
  render() {
    const { navigation } = this.props;
    console.log("PRODUCT", navigation.getParam("product"));
    return (
      <View style={{ flex: 1 }}>
        <Text>Insert Credit Card</Text>
        <TextInput
          style={{ height: 32, width: 100, backgroundColor: "#fff" }}
        />
        <Button
          title={"Go to Product"}
          onPress={this.onGoToProduct.bind(this)}
        />
        <Button title={"Submit"} onPress={this.onSubmit.bind(this)} />
      </View>
    );
  }
}
