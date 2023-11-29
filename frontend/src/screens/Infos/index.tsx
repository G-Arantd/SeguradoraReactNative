import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { TextInputMask } from "react-native-masked-text";

const gradientColors = ["#5374B6", "#b6535371"];

type RouteParams = {
  user: string;
};

export function Infos() {
  const [age, setAge] = useState("");
  const [cpf, setCpf] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const parameters = route.params as RouteParams;

  function handleNext() {
    if (age === "") {
      Alert.alert("Validação", "Preencha todos os campos");
      return;
    }
    navigation.navigate("vehicle", {
      user: parameters.user,
      age: Number(age),
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
            Olá {parameters.user}, vamos realizar uma simulação para um seguro.
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Qual a sua idade?</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={styles.input}
            keyboardType="numeric"
          />

        <Text style={styles.label}>Qual o seu cpf?</Text>
          <TextInputMask
            type={"cpf"}
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
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
