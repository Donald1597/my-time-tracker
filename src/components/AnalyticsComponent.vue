<template>
  <div
    class="mx-auto p-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl shadow-2xl"
  >
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-extrabold text-white mb-6">Analytics</h2>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <canvas id="taskChart" width="400" height="200"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const store = useStore();

// Convert time from HH:MM:SS to minutes
const convertTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(":");
  if (parts.length !== 3) return 0;
  const [hours, minutes, seconds] = parts.map(Number);
  return (hours || 0) * 60 + (minutes || 0) + (seconds || 0) / 60;
};

const tasks = computed(() => store.getters.tasks);

const updateTaskChart = () => {
  const taskCtx = document.getElementById("taskChart").getContext("2d");
  new Chart(taskCtx, {
    type: "bar",
    data: {
      labels: tasks.value.map((task) => task.name),
      datasets: [
        {
          label: "Time Spent (minutes)",
          data: tasks.value.map((task) => convertTimeToMinutes(task.timeSpent)),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Minutes",
          },
        },
        x: {
          title: {
            display: true,
            text: "Tasks",
          },
        },
      },
    },
  });
};

onMounted(() => {
  updateTaskChart();
});

watch(
  () => [tasks.value],
  () => {
    updateTaskChart();
  },
  { deep: true }
);
</script>
