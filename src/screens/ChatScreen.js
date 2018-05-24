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
import { StackActions, NavigationActions } from "react-navigation";
import PRODUCTS from "../data/products";

export default class ChatScreen extends React.Component {
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
