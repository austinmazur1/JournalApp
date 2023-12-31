import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { JournalEntryType } from "../../types/journalEntryTypes";
import { router } from "expo-router";

const backendUrl = "http://192.168.1.41:5005/api";

export default function TabOneScreen() {
  const [data, setData] = useState<JournalEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/entries`);
        if (res.status === 200) {
          setData(res.data);
          console.log(res.data);
        }
      } catch (error: any) {
        console.log("error fetching entries", error);
        Alert.alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournalEntries();
  }, []);

  const handleNotePress = (entryId: string) => {
    console.log("entry", entryId);
    router.push({
      pathname: "/(entry)/entry/[id]",
      params: { id: entryId },
    });
  };

  const handleNoteDelete = async (entryId: string) => {
    console.log('delete')
    try {
      
    } catch (error) {
      
    }

  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={styles.headerText}>
        <Text style={styles.headerTextStyle}>Date</Text>
        <Text style={styles.headerTextStyle}>Subject</Text>
        <Text style={styles.headerTextStyle}>Mood</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.noteContainer}>
          {data?.map((entry) => (
            <Pressable
              onPress={() => {
                handleNotePress(entry._id);
              }}
              onLongPress={() => {
                handleNoteDelete(entry._id)
              }}
              key={entry._id}
              style={styles.singleNoteContainer}
            >
              <Text style={styles.noteText}>{entry.date}</Text>
              <Text style={styles.noteText}>{entry.subject}</Text>
              <Text style={styles.noteText}>{entry.mood}</Text>
            </Pressable>
          ))}
        </View>
        {/* <Text>Email</Text>
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
      /> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 16,
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  headerTextStyle: {
    fontWeight: "bold",
    // fontStyle: 'italic',
  },
  noteContainer: {
    width: "100%",
    marginVertical: 10,
    gap: 20,
  },
  singleNoteContainer: {
    backgroundColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 2,
    height: 40,
  },
  noteText: {
    color: "black",
    fontWeight: "500",
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
