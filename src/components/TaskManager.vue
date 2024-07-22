<template>
  <div
    class="mx-auto p-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl shadow-2xl"
  >
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-extrabold text-white mb-6">Manage Tasks</h2>
    </div>

    <form @submit.prevent="taskToEdit ? updateTask() : addTask()" class="mb-8">
      <div class="mb-5">
        <label
          for="taskName"
          class="block text-gray-100 text-lg font-medium mb-2"
          >Task Name</label
        >
        <input
          v-model="taskName"
          id="taskName"
          type="text"
          class="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out"
          placeholder="Enter task name"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out w-full"
      >
        {{ taskToEdit ? "Update Task" : "Add Task" }}
      </button>
    </form>

    <div class="max-h-[400px] overflow-y-auto space-y-4">
      <ul class="space-y-4">
        <li
          v-for="(task, index) in tasks"
          :key="task.id"
          class="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform"
        >
          <span class="text-gray-800 font-semibold text-lg"
            >{{ index + 1 }}. {{ task.name }}</span
          >
          <div class="flex space-x-3">
            <button
              @click="editTask(task)"
              class="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-300 ease-in-out"
            >
              Edit
            </button>
            <button
              @click="deleteTask(task.id)"
              class="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        </li>
        <li v-if="tasks.length === 0" class="text-center text-gray-100 text-lg">
          No tasks available
        </li>
      </ul>
    </div>

    <button
      v-if="tasks.length > 1"
      @click="clearTasks"
      class="bg-red-700 mt-6 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-400 transition-transform transform hover:scale-105 duration-300 w-full"
    >
      Clear All Tasks
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

const store = useStore();
const toast = useToast();
const taskName = ref("");
const tasks = computed(() => store.getters.tasks);
const taskToEdit = ref(null);

const addTask = () => {
  if (taskName.value.trim()) {
    const newTask = {
      id: Date.now(),
      name: taskName.value,
    };
    store.commit("addTask", newTask);
    taskName.value = "";
    toast.success("Task added successfully !");
  }
};

const editTask = (task) => {
  taskToEdit.value = task;
  taskName.value = task.name;
};

const updateTask = () => {
  if (taskToEdit.value && taskName.value.trim()) {
    const updatedTask = {
      ...taskToEdit.value,
      name: taskName.value,
    };
    store.commit("updateTask", updatedTask);
    taskToEdit.value = null;
    taskName.value = "";
    toast.success("Task updated successfully !");
  }
};

const deleteTask = (taskId) => {
  store.commit("deleteTask", taskId);
  toast.success("Task deleted successfully !");
};

const clearTasks = () => {
  store.commit("clearTasks");
  toast.success("All Tasks deleted successfully !");
};
</script>
