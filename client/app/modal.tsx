import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Text style={styles.headerText}>New Entry</Text> */}
        <TextInput
          style={styles.inputField}
          placeholder="January 1st 2024..."
        />
        <TextInput
          style={styles.inputField}
          placeholder="What's new?"
          multiline
        />
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
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
});
