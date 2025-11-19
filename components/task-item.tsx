import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../constants/types";
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onRemove: (id: string | number) => void; // asegúrate que coincida con tu tipo
}

export default function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={onToggle}
      />
      <Text style={[styles.title, task.completed && styles.completedItem]}>
        {task.title}
      </Text>

      <TouchableOpacity
        style={styles.removeButton}      // <-- esto lo manda a la derecha
        onPress={() => onRemove(task.id)}
      >
        <IconSymbol name="trash.circle" size={24} color="#FF3830" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "#fff",
    marginRight: 12,
  },
  completedCircle: {
    backgroundColor: "#4CAF50",
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
  completedItem: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  removeButton: {
    marginLeft: "auto",
    padding: 8,
  },
});
