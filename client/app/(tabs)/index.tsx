import { StyleSheet } from "react-native";
import { TextInput } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.inputField}
        placeholder={"example@gmail.com"}
        keyboardType="email-address"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.inputField}
        placeholder={"..."}
        keyboardType="visible-password"
        secureTextEntry
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    backgroundColor: "grey",
    width: "60%",
    height: 50,
    borderRadius: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
