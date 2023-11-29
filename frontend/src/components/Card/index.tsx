import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  text: string;
  value: number;
};

export default function Card(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <Text style={styles.text}>
        R$ {props.value.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
}
