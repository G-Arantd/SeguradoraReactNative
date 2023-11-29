import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import Card from "../../components/Card";

const gradientColors = ["#5374B6", "#b6535371"];

type RouteParams = {
  user: string;
  age: number;
  vehicle: string;
  year: number;
};

export function Budget() {
  const [pricePerAge, setPricePerAge] = useState(0);
  const [pricePerYear, setPricePerYear] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  const priceBase = 1000;

  const navigation = useNavigation();
  const route = useRoute();
  const parameters = route.params as RouteParams;

  useEffect(() => {
    var total = priceBase;

    var priceAge = calcPricePerAge(total);
    total += priceAge;

    var priceYear = calcPricePerYear(total);
    total += priceYear;

    setPricePerAge(priceAge);
    setPricePerYear(priceYear);
    setPriceTotal(total);
  }, []);

  function calcPricePerAge(total: number) {
    switch (true) {
      case parameters.age < 22:
        return total * 0.2;
      case parameters.age < 28:
        return total * 0.18;
      default:
        return total * -0.15;
    }
  }

  function calcPricePerYear(total: number) {
    switch (true) {
      case parameters.year < 2000:
        return total * 0.3;
      case parameters.year <= 2009:
        return total * 0.15;
      case parameters.year >= 2016:
        return total * 0.1;
      default:
        return 0;
    }
  }

  function handleNext() {
    navigation.navigate("infos", { user: parameters.user });
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient colors={gradientColors} style={styles.linearGradient}>
      <SafeAreaView style={styles.globalContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Simulacar</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.label}>
            Olá {parameters.user}, fizemos um orçamento para seu veículo{" "}
            {parameters.vehicle}.
          </Text>
        </View>

        <View style={styles.containerInfo}>
          <Card text="Base" value={priceBase} />
          <Card text="Por idade" value={pricePerAge} />
          <Card text="Por ano" value={pricePerYear} />
        </View>

        <View style={styles.containerInfo}>
          <Card text="Total" value={priceTotal} />
        </View>

        <View style={styles.containerInfo}>
          <TouchableOpacity style={styles.btnGlobal} onPress={handleNext}>
            <Text style={styles.btnGlobalText}>Finalizar</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.return}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
