<template>
  <div
    class="mx-auto p-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl shadow-2xl"
  >
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-extrabold text-white mb-6">Logs</h2>
    </div>

    <div class="max-h-[200px] overflow-y-auto space-y-2">
      <ul>
        <li
          v-for="log in logs"
          :key="log.id"
          class="p-3 bg-white border border-gray-300 rounded-lg shadow-md mb-2"
        >
          <div class="flex justify-between text-lg text-gray-800">
            <span>{{ log.time }}</span>
            <span>{{ log.description }}</span>
          </div>
        </li>
        <li v-if="logs.length === 0" class="text-center text-gray-100 text-lg">
          No logs available
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const logs = computed(() => store.getters.logs);

let intervalId = null;

onMounted(() => {
  // Clear logs every 30 seconds
  intervalId = setInterval(() => {
    store.commit("clearLogs");
  }, 30000);
});

onUnmounted(() => {
  // Clear the interval when component is destroyed
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
