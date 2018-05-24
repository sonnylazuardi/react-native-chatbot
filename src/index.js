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
import { createStackNavigator } from "react-navigation";
import ChatScreen from "./screens/ChatScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";

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
