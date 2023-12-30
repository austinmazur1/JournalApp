import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const backendUrl = 'http://192.168.1.41:5005/api';


export default function ModalScreen() {
  const [date, setDate] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios(`${backendUrl}/entries`)
      console.log("submitting", res.data);
    } catch (error) {
      console.log("Error submitting form")
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ width: "65%", alignItems: "center", gap: 6 }}>
          <Text style={{ alignSelf: "flex-start" }}>Date</Text>
          <TextInput
            style={styles.inputField}
            placeholder="January 1st 2024..."
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View style={{ width: "65%", alignItems: "center", gap: 6 }}>
          <Text style={{ alignSelf: "flex-start" }}>Journal Entry</Text>
          <TextInput
            style={[styles.inputField, styles.largeInputField]}
            placeholder="What's new?"
            multiline
            value={journalEntry}
            onChangeText={setJournalEntry}
          />
        </View>
        <Pressable
        onPress={handleSubmit}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#fee" : "#fff" },
            { width: pressed ? "34%" : "35%" },
            { height: pressed ? 49 : 50 },
            {
              borderRadius: 100,
              justifyContent: "center",
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                color: "black",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Save
            </Text>
          )}
        </Pressable>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    gap: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputField: {
    backgroundColor: "grey",
    width: "100%",
    height: 50,
    borderRadius: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
  largeInputField: {
    height: 100,
  },
});
