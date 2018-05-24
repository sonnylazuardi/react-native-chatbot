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
import { GiftedChat } from "react-native-gifted-chat";
import {
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";

const PRODUCTS = [
  {
    title: "Txilieya Two Tone Casual Blouse",
    image:
      "https://ss-imager-prod.freetls.fastly.net/www-images/480/product_images/ee2ca7c96031a16d349facbffe373981.jpg",
    description: `Lingkar dada : 122 cm
  Lebar bahu : 43 cm
  Panjang lengan 48 cm
  Lingkar lengan : 56 cm
  Panjang : 70 cm
  Lingkar pinggang : 124 cm   
  
  Bahan Khosibo
  Detail sisi belakang : 1 Kancing belakang
  
  Model menggunakan size M
  
  Produk bisa dicoba dan dikembalikan: Ya`,
    price: 98000
  }
];

class ChatScreen extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 2,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          },
          product: {
            image: PRODUCTS[0].image,
            title: PRODUCTS[0].title,
            menus: [
              {
                title: "Detail Produk",
                action: () => this.onSelectProduct(PRODUCTS[0])
              },
              {
                title: "Beli",
                action: () => this.onBuyProduct(PRODUCTS[0])
              }
            ]
          }
        },
        {
          _id: 1,
          text: "Hello sonny! Here is the product of the day",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSelectProduct(product) {
    const { navigation } = this.props;
    navigation.navigate({
      key: "Modal",
      routeName: "Modal",
      action: NavigationActions.navigate({
        key: "ProductDetail",
        routeName: "ProductDetail",
        params: {
          product,
          closeModal: () => {
            navigation.dispatch(StackActions.popToTop());
            navigation.dispatch(StackActions.popToTop());
          }
        }
      })
    });
  }

  onBuyProduct(product) {
    alert(product.title);
  }

  onRenderCustomView(props) {
    const { product } = props.currentMessage;
    if (product) {
      return (
        <View style={{ height: 320, width: 250 }}>
          <Image
            source={{ uri: product.image }}
            style={{ height: 250, width: 250 }}
          />
          {product.menus.map((menu, i) => {
            return <Button key={i} title={menu.title} onPress={menu.action} />;
          })}
        </View>
      );
    }
    return null;
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <GiftedChat
        style={{ flex: 1 }}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderCustomView={this.onRenderCustomView.bind(this)}
        user={{
          _id: 1
        }}
      />
    );
  }
}

class ProductDetailScreen extends React.Component {
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

class PaymentScreen extends React.Component {
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

export default createStackNavigator(
  {
    Chat: ChatScreen,
    Modal: createStackNavigator({
      ProductDetail: ProductDetailScreen,
      Payment: PaymentScreen
    })
  },
  {
    initialRouteName: "Chat",
    headerMode: "none",
    mode: "modal"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
