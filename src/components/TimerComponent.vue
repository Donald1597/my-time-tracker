<template>
  <div
    class="mx-auto p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-xl max-w-screen-md"
  >
    <div class="mb-6 text-center">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">
        What are you working on?
      </h2>
    </div>

    <div class="mb-6">
      <select
        v-model="selectedTask"
        :disabled="isTimerRunning"
        class="w-full p-3 sm:p-4 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-teal-500 transition duration-300 ease-in-out"
      >
        <option value="" disabled selected>Select Task</option>
        <option v-for="task in tasks" :key="task.id" :value="task.id">
          {{ task.name }}
        </option>
      </select>
    </div>

    <div
      class="text-center mb-6 p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-600"
    >
      <span class="text-4xl font-extrabold text-white">
        {{ formattedTime }}
      </span>
    </div>

    <div
      class="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mb-6"
    >
      <button
        @click="toggleTimer"
        :disabled="!selectedTask && !isTimerRunning"
        :class="[
          'px-6 py-3 rounded-lg shadow-lg focus:outline-none transition-transform transform duration-300 w-full flex items-center justify-center',
          {
            'bg-teal-600 text-white hover:bg-teal-700 focus:ring-4 focus:ring-teal-400 cursor-pointer':
              selectedTask && !isTimerRunning,
            'bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-500 cursor-pointer':
              selectedTask && isTimerRunning,
            'bg-gray-500 text-gray-200 cursor-not-allowed':
              !selectedTask && !isTimerRunning,
          },
        ]"
      >
        <span v-if="!isTimerRunning" class="mr-3 text-2xl sm:text-4xl">
          <i class="fas fa-play"></i>
        </span>
        <span v-else class="mr-3 text-2xl sm:text-4xl">
          <i class="fas fa-stop"></i>
        </span>
        <span class="text-lg sm:text-xl font-semibold">{{
          isTimerRunning ? "Stop" : "Start"
        }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

const store = useStore();
const toast = useToast();
const tasks = computed(() => store.getters.tasks);
const selectedTask = ref("");
const time = ref(0);
let timerId = null;
const startTime = ref(null);
const isTimerRunning = ref(false);

const toggleTimer = () => {
  if (selectedTask.value) {
    if (isTimerRunning.value) {
      stopTimer();
    } else {
      startTimer();
    }
    isTimerRunning.value = !isTimerRunning.value;
  }
};

const formattedTime = computed(() => {
  const hours = Math.floor(time.value / 3600);
  const minutes = Math.floor((time.value % 3600) / 60);
  const seconds = time.value % 60;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
});

const startTimer = () => {
  if (timerId || !selectedTask.value) return;
  store.commit("addLog", `Started tracking task "${selectedTask.value}"`);
  toast.success("Time is tracking...");
  startTime.value = Date.now();
  timerId = setInterval(() => {
    time.value = Math.floor((Date.now() - startTime.value) / 1000);
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerId);
  timerId = null;
  updateTaskTime();
};

const resetTimer = () => {
  store.commit("addLog", "Tracking reset");
  time.value = 0;
  startTime.value = null;
};

const updateTaskTime = () => {
  if (selectedTask.value) {
    const task = tasks.value.find((t) => t.id === selectedTask.value);
    if (task) {
      const existingTime = task.timeSpent ? parseTime(task.timeSpent) : 0;
      const totalTime = existingTime + time.value;
      const formattedTimeSpent = formatTime(totalTime);

      const timeEntry = {
        id: Date.now(),
        taskId: task.id,
        taskName: task.name,
        startTime: new Date(startTime.value).toISOString(),
        endTime: new Date().toISOString(),
        duration: formattedTimeSpent,
        notes: "",
      };
      store.commit("addTimeEntry", timeEntry);

      store.commit("updateTaskTime", {
        id: task.id,
        timeSpent: formattedTimeSpent,
      });
      toast.success("Time tracking stopped...");
    }
  }
};

const parseTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

watch(selectedTask, (newTask, oldTask) => {
  if (isTimerRunning.value) {
    stopTimer();
    if (oldTask) {
      updateTaskTime();
    }
  }
  if (newTask) {
    resetTimer();
  }
});
</script>
