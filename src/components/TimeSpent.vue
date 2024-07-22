<template>
  <div
    class="p-8 bg-gradient-to-r from-blue-600 to-teal-400 rounded-xl shadow-2xl mx-auto"
  >
    <h2 class="text-3xl font-extrabold text-white mb-8 text-center">
      Time Spent on Tasks
    </h2>

    <div class="max-h-[500px] overflow-y-auto">
      <ul v-if="tasks.length > 0" class="space-y-4">
        <li
          v-for="(task, index) in tasks"
          :key="task.id"
          class="flex justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform"
        >
          <span class="font-semibold text-gray-800 text-lg"
            >{{ index + 1 }}. {{ task.name }}</span
          >
          <span class="text-gray-700 text-lg">{{
            task.timeSpent || "0:00:00"
          }}</span>
        </li>
      </ul>

      <span v-else class="text-center block text-gray-500 text-lg"
        >No tasks available</span
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const tasks = computed(() => store.getters.tasks);
</script>
