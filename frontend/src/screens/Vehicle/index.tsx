import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const gradientColors = ["#5374B6", "#b6535371"];

type RouteParams = {
  user: string;
  age: number;
};

export function Vehicle() {
  const [vehicle, setVehicle] = useState("");
  const [yearVehicle, setYearVehicle] = useState("");
  const [priceVehicle, setPriceVehivle] = useState("")

  const navigation = useNavigation();
  const route = useRoute();

  const parameters = route.params as RouteParams;

  function handleNext() {
    if (vehicle === "" || yearVehicle === "" || priceVehicle == "") {
      Alert.alert("Validação", "Preencha todos os campos");
      return;
    }
    navigation.navigate("budget", {
      user: parameters.user,
      age: parameters.age,
      vehicle: vehicle,
      year: Number(yearVehicle),
      price: Number(priceVehicle)
    });
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
            Olá {parameters.user}, agora vamos solicitar os dados do seu
            veiculo.
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Qual seu carro?</Text>
          <TextInput
            value={vehicle}
            onChangeText={setVehicle}
            style={styles.input}
          />

          <Text style={styles.label}>Qual o valor do seu carro?</Text>
          <TextInput
            keyboardType="numeric"
            value={priceVehicle}
            onChangeText={setPriceVehivle}
            style={styles.input}
          />

          <Text style={styles.label}>Qual o ano do seu carro?</Text>
          <TextInput
            keyboardType="numeric"
            value={yearVehicle}
            onChangeText={setYearVehicle}
            style={styles.input}
          />
        </View>

        <View style={styles.inputsContainer}>
          <TouchableOpacity style={styles.btnGlobal} onPress={handleNext}>
            <Text style={styles.btnGlobalText}>Próximo</Text>
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
