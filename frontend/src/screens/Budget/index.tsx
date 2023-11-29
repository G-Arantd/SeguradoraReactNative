import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
  const [currencySymbol, setCurrencySymbol] = useState("");

  const navigation = useNavigation();

  const route = useRoute();

  const parameters = route.params as RouteParams;

  const precoDolar = 5.0;

  function handleNext() {
    navigation.navigate("infos", { user: parameters.user });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    calcSecurity();
  }, []);

  function calcSecurity() {
    var firstPriceBase = calcPriceBase();
    setCurrencySymbol("R$");
    setPriceBase(firstPriceBase);
    var priceTotal = firstPriceBase;

    var pricePerAge = calcPricePerAge(priceTotal);
    priceTotal = priceTotal + pricePerAge;

    var pricePerYear = calcPricePerYear(priceTotal);
    priceTotal = priceTotal + pricePerYear;

    setPricePerAge(pricePerAge);
    setPricePerYear(pricePerYear);
    setPriceTotal(priceTotal);
  }

  function calcPriceBase() {
    var priceBase = 1000;
    var priceVehicle = parameters.price;
    if (priceVehicle > 100000) {
      priceBase = 2000;
    } else if (priceVehicle >= 50000 && priceVehicle <= 100000) {
      priceBase = 1500;
    }
    return priceBase;
  }

  function calcPricePerAge(priceTotal: number) {
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

  function calcPricePerYear(valorTotal: number) {
    var priceYear = 0;
    if (parameters.year < 2000) {
      priceYear = valorTotal * 0.3;
    } else if (parameters.year >= 2000 && parameters.year <= 2009) {
      priceYear = valorTotal * 0.15;
    } else if (parameters.year >= 2016) {
      priceYear = valorTotal * 0.1;
    }
    return priceYear;
  }

  function priceInDolar() {
    var priceBaseDolar = priceBase / precoDolar;
    var priceTotalDolar = priceTotal / precoDolar;
    var pricePerAgeDolar = pricePerAge / precoDolar;
    var pricePerYearDolar = pricePerYear / precoDolar;

    setPriceBase(priceBaseDolar);
    setPriceTotal(priceTotalDolar);
    setPricePerAge(pricePerAgeDolar);
    setPricePerYear(pricePerYearDolar);
    setCurrencySymbol("$");
  }

  return (
    <LinearGradient
      colors={["#5374B6", "#f7b5b5"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.globalContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Simulacar</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.label}>
            Olá {parameters.user}, fizemos um orçamento para seu veiculo{" "}
            {parameters.vehicle}.
          </Text>
        </View>

        <View style={styles.containerInfo}>
          <Card text="Base" value={priceBase} currencySymbol={currencySymbol} />
          <Card
            text="Por idade"
            value={pricePerAge}
            currencySymbol={currencySymbol}
          />
          <Card text="Por ano" value={pricePerYear} currencySymbol={currencySymbol} />
        </View>

        <View style={styles.containerInfo}>
          <Card text="Total" value={priceTotal} currencySymbol={currencySymbol} />
        </View>

        <BouncyCheckbox
          fillColor="black"
          unfillColor="#FFFFFF"
          textStyle={{ textDecorationLine: "none", color: "black" }}
          text="Valores em dólar"
          iconStyle={{ borderColor: "black" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked: boolean) => {
            console.log("Checked: ", isChecked);
            if (isChecked) {
              priceInDolar();
            } else {
              calcSecurity();
            }
          }}
        />

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
