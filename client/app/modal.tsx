import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
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
import { router } from "expo-router";

const backendUrl = "http://192.168.1.41:5005/api";

export default function ModalScreen() {
  const [date, setDate] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [mood, setMood] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/new-entry`, {
        date,
        subject,
        mood,
        note: journalEntry,
      });
      if (res.status === 200) {
        Alert.alert(res.data);
      }
    } catch (error) {
      console.log("Error submitting form");
    } finally {
      setIsLoading(false);
      setDate("");
      setJournalEntry("");
      setMood("");
      setSubject("");
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
          <Text style={{ alignSelf: "flex-start", marginTop: 20 }}>
            Subject
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder="Daily Note / Work / Personal..."
            value={subject}
            onChangeText={setSubject}
          />
          <Text style={{ alignSelf: "flex-start", marginTop: 20 }}>Mood</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Happy / Excited / Mad..."
            value={mood}
            onChangeText={setMood}
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
