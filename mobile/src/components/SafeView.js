import { StyleSheet, Platform, StatusBar } from "react-native";

const safeView = StyleSheet.create({
  android: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default safeView;
