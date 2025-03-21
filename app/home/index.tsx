import { Link, Stack } from "expo-router";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import TodoListItem from "../components/todo_list_item";

import { useEffect, useState } from "react";
import { Image } from "expo-image";
import * as SQLite from "expo-sqlite";
import { TodoList } from "../model/todo-model";

export default function Home() {
  const createTwoButtonAlert = () =>
    Alert.alert("Empty field", "Enter task", [
      // {
      //   text: "Cancel",
      //   onPress: () => console.log("Cancel Pressed"),
      //   style: "cancel",
      // },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const [tasks, setTasks] = useState<TodoList[]>([]);

  // init database
  useEffect(() => {
    async function init() {
      try {
        console.log("init");
        const db = await SQLite.openDatabaseAsync("todos");

        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, isCompleted INTEGER);
        `);
      } catch (error) {
        console.log("init error - " + error);
      }
    }
    init();
  }, []);

  // get all data
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("todos");
      console.log("getData");

      const items: TodoList[] = await db.getAllAsync("SELECT * FROM todo");

      setTasks(items);
    } catch (error) {
      console.log("error getalldata - " + error);
    }
  };

  const [textInput, setText] = useState("");

  // add task
  const addTask = async () => {
    if (!textInput) return createTwoButtonAlert();

    try {
      const db = await SQLite.openDatabaseAsync("todos");

      const result = await db.runAsync(
        "INSERT INTO todo (text, isCompleted) VALUES (?, ?)",
        textInput,
        false
      );

      getAllData();
    } catch (error) {
      console.log(error);
    }

    setText("");
  };

  const removeTask = (task: { name: string }) => {
    setTasks(tasks.filter((item) => item.text !== task.name));
  };

  const updateTask = async (task: TodoList, id: number) => {
    try {
      const db = await SQLite.openDatabaseAsync("todos");

      console.log("task.isCompleted - " + task.isCompleted);

      const result = await db.runAsync(
        "UPDATE todo SET isCompleted = ? WHERE id = ?",
        task.isCompleted,
        id
      );
    } catch (error) {
      console.log("update error - " + error);
    }
    getAllData();
  };

  const onItemClick = (task: TodoList) => {
    task.isCompleted = !task.isCompleted;

    updateTask(task, task.id);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <View
        style={{
          position: "relative",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 60,
        }}
      >
        <Stack.Screen options={{ title: "Today's tasks" }} />

        {tasks.length > 0 ? (
          <ScrollView
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
          >
            {tasks.map((item, i) => {
              return (
                <View key={i}>
                  <TodoListItem item={item} onPress={onItemClick} />
                  <View
                    style={{ height: 20, backgroundColor: "transparent" }}
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            <Text>No Tasks Available.....</Text>
          </View>
        )}

        <View
          style={{
            position: "absolute",
            paddingTop: 20,
            margin: 20,
            paddingBottom: 20,
            flexDirection: "row",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <TextInput
            placeholder="Write a task"
            placeholderTextColor="#C0C0C0"
            onChangeText={(txt) => {
              setText(txt);
            }}
            defaultValue={textInput}
            style={{
              padding: 15,
              flex: 1,
              backgroundColor: "white",
              borderRadius: 60,
              shadowColor: "#00000026",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
            }}
          ></TextInput>
          {/* // add Button console.log(txt); */}
          <Pressable onPress={addTask}>
            {/* <Pressable onPress={initData}> */}
            <View
              style={{
                padding: 13,
                backgroundColor: "white",
                borderRadius: 52,
                marginStart: 20,
                shadowColor: "#00000026",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
              }}
            >
              <Image
                source={require("../../assets/images/ant-design_plus-outlined.png")}
                style={{ width: 32, height: 32 }}
              ></Image>
            </View>
          </Pressable>

          <Link href={"/login"}>Login</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
