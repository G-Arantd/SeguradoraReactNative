import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  text: string;
  currencySymbol: string;
  value: number;
};

export default function Card(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <Text style={styles.text}>
        {props.currencySymbol} {props.value.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
}
