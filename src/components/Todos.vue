<template>
  <section class="create-todo">
    <div class="woo">
      <form @submit.prevent="addTodo">
        <h4>Buatlah daftar kegiatan anda</h4>
        <input type="text" placeholder="contoh [ Lari pagi ]" v-model="input_content" />
        <input type="submit" value="Tambah Kegiatan" />
      </form>

      <div class="todo-list">
        <h3 class="kegiatan">Daftar Kegiatan</h3>
        <div class="list1">
          <div class="filter">


            
            <button @click="toggleFilter">{{ filterCompleted ? 'Tampilkan' : 'Sudah selesai' }}</button>
          </div>

          <div class="list">
            <div v-for="(todo, index) in filteredTodos" :key="todo.createdAt" :class="`todo-item ${todo.completed && 'done'}`">
              <label>
                <input type="checkbox" v-model="todo.completed" @change="updateTodo" />
                <span :class="`bubble ${todo.category}`"></span>
              </label>

              <div class="todo-content">
                <input type="text" v-model="todo.task" :readonly="true" />
              </div>

              <div class="actions">
                <button class="delete" @click="removeTodo(index)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>{{ unfinishedCount }} tasks left</p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../store/todo'

const todoStore = useTodoStore()
const input_content = ref('')
const filterCompleted = ref(false)

const filteredTodos = computed(() => {
  return todoStore.filteredTodos(filterCompleted.value)
})

const unfinishedCount = computed(() => {
  return todoStore.unfinishedTodosCount
})

const addTodo = () => {
  if (input_content.value.trim() === '') {
    return
  }

  todoStore.addTodo(input_content.value)
  input_content.value = ''
}

const updateTodo = () => {
  todoStore.$patch({
    todos: [...todoStore.todos]
  })
}

const removeTodo = (index) => {
  todoStore.removeTodo(index)
}

const toggleFilter = () => {
  filterCompleted.value = !filterCompleted.value
}
</script>

<style scoped>
body {
  display: flex;
    align-items: center;
    justify-content: center;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.create-todo {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.create-todo .todo-content input[type="text"] {
  color: black;
  background-color: rgba(0, 0, 0, 0);
  margin-bottom: 10px;
  height: 29px;
  width: calc(30% - 20px);
  padding: 0 10px;
  box-sizing: border-box;
  
}

.filter {
  margin-bottom: 4px;
}

.filter button {
  background-color: #7900ff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;

  cursor: pointer;
  border-radius: 5px;
}

.filter button:hover {
  background-color: #45a049;
}

.todo-item.done .todo-content {
  text-decoration: line-through;
}

.todo-item.done .todo-content input {
  text-decoration: line-through;
}
</style>
