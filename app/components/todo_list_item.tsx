import { View, Text, Pressable } from "react-native";
import React from "react";
import { TodoList } from "../model/todo-model";

export default function TodoListItem({
  item,
  onPress,
}: {
  item: TodoList;
  onPress: any;
}) {
  return (
    <Pressable onPress={() => onPress(item)}>
      <View style={{ position: "relative" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            width: "100%",
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#F6F6F6",
          }}
        >
          <View
            style={{
              borderRadius: 5,
              backgroundColor: "#55bcf640",
              width: 24,
              height: 24,
            }}
          ></View>

          <Text
            style={{
              marginStart: 15,
              flex: 1,
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            {item.text}
          </Text>

          <View
            style={{
              width: 12,
              height: 12,
              borderWidth: 2,
              marginStart: 15,
              borderColor: "#558cf6",
              borderRadius: 5,
              backgroundColor: item.isCompleted ? "#558cf6" : "white",
            }}
          ></View>
        </View>

        {item.isCompleted ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              borderRadius: 10,
              height: "100%",
              backgroundColor: "#ffffff90",
              position: "absolute",
            }}
          />
        ) : (
          <View />
        )}
      </View>
    </Pressable>
  );
}
