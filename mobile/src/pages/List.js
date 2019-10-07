import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";

import socketio from "socket.io-client";

import SpotList from "../components/SpotList";

import logo from "../../assets/logo.png";

import api from "../services/api";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio(api.defaultBaseURL, {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    async function getStoragedTechs() {
      let storagedTechs = await AsyncStorage.getItem("techs");
      storagedTechs = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(storagedTechs);
    }

    getStoragedTechs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech}></SpotList>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
