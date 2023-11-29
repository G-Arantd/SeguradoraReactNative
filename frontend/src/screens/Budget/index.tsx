import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
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
  price: number;
};

export function Budget() {
  const [priceBase, setPriceBase] = useState(0);
  const [pricePerAge, setPricePerAge] = useState(0);
  const [pricePerYear, setPricePerYear] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const parameters = route.params as RouteParams;

  function handleNext() {
    navigation.navigate("infos", { user: parameters.user });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    var priceTotal = calculateBasePrice();
    setPriceBase(priceTotal);

    var priceAge = calculatePricePerAge(priceTotal);
    priceTotal += priceAge;

    var priceYear = calculatePricePerYear(priceTotal);
    priceTotal += priceYear;

    setPricePerAge(priceAge);
    setPricePerYear(priceYear);
    setPriceTotal(priceTotal);
  }, []);

  function calculateBasePrice() {
    var priceBase = 1000;
    var vehiclePrice = parameters.price;

    if (vehiclePrice > 100000) {
      priceBase = 2000;
    } else if (vehiclePrice >= 50000 && vehiclePrice <= 100000) {
      priceBase = 1500;
    }

    return priceBase;
  }

  function calculatePricePerAge(priceTotal: number) {
    var priceAge = 0;

    if (parameters.age < 22) {
      priceAge = priceTotal * 0.2;
    } else if (parameters.age >= 22 && parameters.age < 28) {
      priceAge = priceTotal * 0.18;
    } else {
      priceAge = priceTotal * -0.15;
    }

    return priceAge;
  }

  function calculatePricePerYear(priceTotal: number) {
    var priceYear = 0;

    if (parameters.year < 2000) {
      priceYear = priceTotal * 0.3;
    } else if (parameters.year >= 2000 && parameters.year <= 2009) {
      priceYear = priceTotal * 0.15;
    } else if (parameters.year >= 2016) {
      priceYear = priceTotal * 0.1;
    }

    return priceYear;
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
