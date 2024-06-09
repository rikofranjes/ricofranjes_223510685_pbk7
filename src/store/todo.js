// src/store/todo.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([
    { task: 'Lari pagi', completed: false, createdAt: '2023-06-01T08:30:00' },
    { task: 'Baca buku', completed: true, createdAt: '2023-06-01T09:00:00' },
    { task: 'Belajar Vue.js', completed: false, createdAt: '2023-06-01T10:00:00' },
  ]);

  const addTodo = (task) => {
    todos.value.push({
      task,
      completed: false,
      createdAt: new Date().toISOString(),
    });
  };

  const removeTodo = (index) => {
    todos.value.splice(index, 1);
  };

  const filteredTodos = (filterCompleted) => {
    return filterCompleted ? todos.value.filter(todo => todo.completed) : todos.value;
  };

  const unfinishedTodosCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length;
  });

  return {
    todos,
    addTodo,
    removeTodo,
    filteredTodos,
    unfinishedTodosCount,
  };
});
