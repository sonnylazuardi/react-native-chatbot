import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert,
  Modal
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { NavigationActions, StackNavigator } from "react-navigation";
import PaymentScreen from "../screens/PaymentScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import PRODUCTS from "../data/products";

export default class ChatScreen extends React.Component {
  navigator;
  state = {
    messages: [],
    showModal: false
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
                title: "Bayar",
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
    this.setState(
      {
        showModal: true
      },
      () => {
        this.navigator &&
          this.navigator.dispatch(
            NavigationActions.navigate({
              key: "Payment",
              routeName: "Payment",
              params: {
                product,
                closeModal: () => this.onCloseModal()
              }
            })
          );
      }
    );
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

  onCloseModal() {
    this.setState({
      showModal: false
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  stackNavigator = StackNavigator(
    {
      Payment: PaymentScreen,
      ProductDetail: ProductDetailScreen
    },
    {
      initialRouteName: "ProductDetail",
      initialRouteParams: {
        product: {},
        closeModal: () => this.onCloseModal()
      }
    }
  );

  renderModal() {
    const Navigator = this.stackNavigator;
    return (
      <Modal
        style={{ flex: 1 }}
        visible={this.state.showModal}
        animationType="slide"
        transparent={false}
        onShow={() => {
          Alert.alert(
            "Perhatian",
            "Informasi kartu kredit anda tidak di simpan oleh e-commerce"
          );
        }}
      >
        <Navigator ref={navigator => (this.navigator = navigator)} />
      </Modal>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          style={{ flex: 1 }}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderCustomView={this.onRenderCustomView.bind(this)}
          user={{
            _id: 1
          }}
        />
        {this.renderModal()}
      </View>
    );
  }
}
