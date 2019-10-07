import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";

import SpotList from "../components/SpotList";

import logo from "../../assets/logo.png";

export default function List() {
  const [techs, setTechs] = useState([]);

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
