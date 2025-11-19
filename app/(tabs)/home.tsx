import TaskItem from '@/components/task-item';
import Title from '@/components/ui/title';
import { Ionicons } from '@expo/vector-icons'; // <--- usar Ionicons
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../contexts/UserContext';

const INITIAL_TODOS = [
  { id: '1', title: 'Comprar víveres', completed: false },
  { id: '2', title: 'Llevar el auto al taller', completed: false },
  { id: '3', title: 'Preparar presentación para el trabajo', completed: false },
  { id: '4', title: 'Hacer ejercicio por la tarde', completed: false },
  { id: '5', title: 'Leer un capítulo del libro', completed: false },
];

export default function HomeScreen() {
  const { user } = useUser();
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Cargando...');
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(''); // <- NUEVO ESTADO

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeMessage('¡Bienvenido! ');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTask = (id: string) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const removeTask = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const newTask = {
      id: (todos.length + 1).toString(),
      title: title.trim(),
      completed: false,
    };
    setTodos(prev => [...prev, newTask]);
    setNewTaskTitle(''); // limpiar input
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title>
          {welcomeMessage + user?.email}
        </Title>
      </View>

      {/* INPUT PARA NUEVA TAREA */}
      <View style={styles.newTaskContainer}>
        <TextInput
          style={styles.newTaskInput}
          placeholder="Escribe una nueva tarea..."
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TouchableOpacity
          style={styles.addIconButton}
          onPress={() => addTask(newTaskTitle)}
        >
          {/* Icono + confiable con Ionicons */}
          <Ionicons name="add-circle" size={28} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE TAREAS */}
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          task={todo}
          onToggle={() => toggleTask(todo.id)}
          onRemove={() => removeTask(todo.id)}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F6FF',
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2933',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#52606D',
  },
  welcomeEmail: {
    fontWeight: '600',
    color: '#3B82F6',
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2933',
    marginBottom: 12,
  },
  tasksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E7F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tasksPlaceholder: {
    fontSize: 14,
    color: '#6B7280',
  },
  newTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  newTaskInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 14,
  },
  addIconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
