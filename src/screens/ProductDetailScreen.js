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

export default class ProductDetailScreen extends React.Component {
  onBuyProduct() {
    const { navigation } = this.props;
    navigation.navigate("Payment", {
      closeModal: navigation.getParam("closeModal")
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    Alert.alert(
      navigation.getParam("product").title,
      "Produk ini harganya: " + navigation.getParam("product").price
    );
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("product").title,
    headerLeft: (
      <Button
        title="Close"
        onPress={() => navigation.getParam("closeModal")()}
      />
    )
  });
  render() {
    const { navigation } = this.props;
    const product = navigation.getParam("product");
    const { title, price, image } = product;
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: image }} style={{ height: 250, width: 250 }} />
        <Text>{title}</Text>
        <Text>{price}</Text>
        <Button title={"Beli"} onPress={this.onBuyProduct.bind(this)} />
      </View>
    );
  }
}
